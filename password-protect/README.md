# Passsword Protection

This folder has a docker-compose.yml file that can be used to deploy Interstellar with a password on any system with Docker installed.
Quick Start:
1. Run `sudo docker compose up -d`
2. Run `docker exec password-protect-caddy-1 "caddy hash-password --plaintext <yourpasswordhere>"`. Copy the command's output.
3. Run `sudo docker compose down`
4. Edit  [Caddyfile](Caddyfile), replacing the appropriate fields.
5. Run `sudo docker compose up -d`
App should be published on port 80. Advanced users can add SSL and other fancy stuff in the Caddyfile. See https://caddyserver.com/docs/caddyfile.
