# dashboard.py - simple web interface for installer proxy logs
# Part of the Starlancer project, licensed under AGPL-3.0-or-later.

from flask import Flask, render_template_string, request, redirect
import sqlite3
import os

DB_PATH = os.environ.get("INSTALLER_PROXY_DB", "install_logs.db")

app = Flask(__name__)

TABLE_TEMPLATE = """
<!doctype html>
<title>Install Logs</title>
<h1>Installation Logs</h1>
<table border="1" cellspacing="0" cellpadding="5">
<tr><th>ID</th><th>Timestamp</th><th>Command</th><th>Allowed</th><th>Return Code</th></tr>
{% for row in rows %}
<tr>
<td>{{ row[0] }}</td>
<td>{{ row[1] }}</td>
<td>{{ row[2] }}</td>
<td>{{ row[3] }}</td>
<td>{{ row[4] }}</td>
</tr>
{% endfor %}
</table>
"""


@app.route("/")
def index():
    con = sqlite3.connect(DB_PATH)
    cur = con.execute("SELECT id, timestamp, command, allowed, return_code FROM logs ORDER BY id DESC")
    rows = list(cur.fetchall())
    con.close()
    return render_template_string(TABLE_TEMPLATE, rows=rows)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
