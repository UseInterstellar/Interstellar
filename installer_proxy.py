# installer_proxy.py - Intercepts installer commands and logs them.
# This file is part of the Starlancer project and licensed under AGPL-3.0-or-later.

import argparse
import sqlite3
import subprocess
import sys
import os
from datetime import datetime
from typing import List

DB_PATH = os.environ.get("INSTALLER_PROXY_DB", "install_logs.db")
WHITELIST_PATH = os.environ.get("INSTALLER_PROXY_WHITELIST", "whitelist.txt")
BLACKLIST_PATH = os.environ.get("INSTALLER_PROXY_BLACKLIST", "blacklist.txt")
PIP_MIRROR = os.environ.get("INSTALLER_PROXY_PIP_MIRROR")
AUTO_DENY = os.environ.get("INSTALLER_PROXY_AUTO_DENY", "0") == "1"


class InstallProxy:
    def __init__(self):
        self.conn = sqlite3.connect(DB_PATH)
        self.conn.execute(
            """
            CREATE TABLE IF NOT EXISTS logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                command TEXT NOT NULL,
                allowed INTEGER NOT NULL,
                return_code INTEGER,
                stdout TEXT,
                stderr TEXT
            )
            """
        )
        self.conn.commit()
        self.whitelist = self._load_list(WHITELIST_PATH)
        self.blacklist = self._load_list(BLACKLIST_PATH)

    def _load_list(self, path: str) -> List[str]:
        if not os.path.isfile(path):
            return []
        with open(path, "r", encoding="utf-8") as f:
            return [line.strip() for line in f if line.strip() and not line.startswith("#")]

    def check_allowed(self, command: List[str]) -> bool:
        cmd_str = " ".join(command)
        for term in self.blacklist:
            if term and term in cmd_str:
                return False
        if self.whitelist:
            return any(term in cmd_str for term in self.whitelist)
        return True

    def rewrite(self, command: List[str]) -> List[str]:
        if PIP_MIRROR and command and command[0] == "pip" and "install" in command:
            if "--index-url" not in command:
                insert_pos = command.index("install") + 1
                command.insert(insert_pos, "--index-url")
                command.insert(insert_pos + 1, PIP_MIRROR)
        return command

    def run(self, command: List[str]) -> int:
        allowed = self.check_allowed(command)
        timestamp = datetime.utcnow().isoformat()
        rewritten = self.rewrite(command[:])

        if not allowed and AUTO_DENY:
            self._log(timestamp, " ".join(rewritten), allowed, None, "", "AUTO-DENY")
            print("Command denied by policy")
            return 1

        process = subprocess.run(rewritten, capture_output=True, text=True)
        self._log(
            timestamp,
            " ".join(rewritten),
            allowed,
            process.returncode,
            process.stdout,
            process.stderr,
        )
        if process.stdout:
            sys.stdout.write(process.stdout)
        if process.stderr:
            sys.stderr.write(process.stderr)
        return process.returncode

    def _log(
        self,
        timestamp: str,
        command: str,
        allowed: bool,
        return_code: int | None,
        stdout: str,
        stderr: str,
    ) -> None:
        self.conn.execute(
            "INSERT INTO logs(timestamp, command, allowed, return_code, stdout, stderr) VALUES(?,?,?,?,?,?)",
            (timestamp, command, int(allowed), return_code, stdout, stderr),
        )
        self.conn.commit()


def main() -> int:
    parser = argparse.ArgumentParser(description="Installer proxy")
    parser.add_argument("command", nargs=argparse.REMAINDER, help="Command to run")
    args = parser.parse_args()

    if not args.command:
        print("Usage: installer_proxy.py <command>")
        return 1

    proxy = InstallProxy()
    return proxy.run(args.command)


if __name__ == "__main__":
    raise SystemExit(main())
