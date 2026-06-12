# Deployment to AWS EC2 (Next.js portfolio)

This guide shows step-by-step commands to deploy the portfolio to an Ubuntu EC2 instance, run it behind Nginx, and configure TLS using Cloudflare Origin Certificates. Do NOT commit private keys or certificates to your Git repo — keep them on the server or in a secrets manager.

## Overview
- Clone your GitHub repo on the EC2 instance
- Install Node.js, build the Next.js app, run with `pm2` or systemd
- Use Nginx as a reverse proxy on ports 80/443
- Install Cloudflare Origin Certificate and private key on the server (secure)
- Configure Cloudflare SSL/TLS to **Full (strict)**

---

## Prerequisites
- An AWS EC2 instance (Ubuntu 22.04 recommended) with a public IP
- Security Group: ports 22 (SSH), 80 (HTTP), 443 (HTTPS) allowed
- A domain configured in Cloudflare (e.g., `sowmya.qzz.io`) and DNS A record pointing to the EC2 public IP
- Your GitHub repo: `https://github.com/sowmyavankayalapati1507-sketch/portfolio.git`
- The Cloudflare origin certificate and private key (provided by you). Keep these private.

---

## Prepare your local repo and push to GitHub (if not already pushed)
Run these locally in your project root:

```bash
# initialize git if needed
git init
git add -A
git commit -m "initial commit"
# add remote (replace with your GitHub remote URL)
git remote add origin https://github.com/sowmyavankayalapati1507-sketch/portfolio.git
git branch -M main
git push -u origin main
```

If you already have a remote, just push your changes:

```bash
git add -A && git commit -m "deploy prep" || true
git push origin main
```

---

## Provision EC2 and SSH in
Use the AWS console to launch an Ubuntu instance and obtain the `ec2-user`/`ubuntu` user and key pair. Then:

```bash
# from your workstation
ssh -i /path/to/your-aws-key.pem ubuntu@<EC2_PUBLIC_IP>
```

---

## Server setup (run on the EC2 instance)

1) Update and install essentials

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential nginx
```

2) Install Node.js (18+ recommended) and `pm2`

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

3) Clone your repo and install dependencies

```bash
cd /home/ubuntu
git clone https://github.com/sowmyavankayalapati1507-sketch/portfolio.git
cd portfolio
npm ci
npm run build
```

4) Create a `.env.production` (if you use env vars). Example (do not store secrets in repo):

```bash
cat > .env.production <<'EOF'
NEXT_PUBLIC_SITE_URL=https://sowmya.qzz.io
GOOGLE_SITE_VERIFICATION=54Z5X_l3QEDarJzQc9pgpTGdrB0n-MwsARidbyHUd9o
ANOTHER_VERIFICATION=ARtlgAUq8LNikgV7A6n8ycbYQVuqo1hofYdLpHvnchw
EOF

# secure the file
chmod 600 .env.production
```

5) Start the app with `pm2` (example using `next start` on port 3000)

```bash
# run in repo root
pm2 start "npm -- start" --name portfolio
pm2 save
pm2 startup systemd
```

Adjust `package.json` scripts so `npm start` runs `next start -p 3000` (default Next.js production). If you run a Node server, adapt accordingly.

---

## Configure Nginx as reverse proxy with Cloudflare Origin Cert

1) Copy or create the Cloudflare origin certificate and private key on the server. Recommended paths:

- `/etc/ssl/certs/cloudflare_origin.pem`
- `/etc/ssl/private/cloudflare_origin.key`

You can securely copy from your workstation:

```bash
# on your workstation
scp -i /path/to/your-aws-key.pem cloudflare_origin.pem ubuntu@<EC2_PUBLIC_IP>:/tmp/
scp -i /path/to/your-aws-key.pem cloudflare_origin.key ubuntu@<EC2_PUBLIC_IP>:/tmp/

# on the server
sudo mv /tmp/cloudflare_origin.pem /etc/ssl/certs/
sudo mv /tmp/cloudflare_origin.key /etc/ssl/private/
sudo chown root:root /etc/ssl/certs/cloudflare_origin.pem /etc/ssl/private/cloudflare_origin.key
sudo chmod 644 /etc/ssl/certs/cloudflare_origin.pem
sudo chmod 600 /etc/ssl/private/cloudflare_origin.key
```

If you must paste the certificate directly on the server (less recommended), use:

```bash
sudo tee /etc/ssl/certs/cloudflare_origin.pem > /dev/null <<'EOF'
-----BEGIN CERTIFICATE-----
PASTE YOUR CERTIFICATE HERE
-----END CERTIFICATE-----
EOF

sudo tee /etc/ssl/private/cloudflare_origin.key > /dev/null <<'EOF'
-----BEGIN PRIVATE KEY-----
PASTE YOUR PRIVATE KEY HERE
-----END PRIVATE KEY-----
EOF
sudo chmod 600 /etc/ssl/private/cloudflare_origin.key
```

2) Create an Nginx server block for `sowmya.qzz.io` (replace domain)

```bash
sudo tee /etc/nginx/sites-available/portfolio <<'EOF'
server {
    listen 80;
    server_name sowmya.qzz.io;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name sowmya.qzz.io;

    ssl_certificate /etc/ssl/certs/cloudflare_origin.pem;
    ssl_certificate_key /etc/ssl/private/cloudflare_origin.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo nginx -t && sudo systemctl restart nginx
```

3) In your Cloudflare dashboard for the domain:
- SSL/TLS -> set **SSL/TLS encryption mode** to **Full (strict)**
- Ensure the A record for `sowmya.qzz.io` points to your EC2 IP and is proxied (orange cloud) if you want Cloudflare features.

---

## Security notes
- Never commit your private key or certificate to the repository. Use `scp`, `ssh`, or a secrets manager (AWS Secrets Manager, SSM Parameter Store).
- Restrict `/etc/ssl/private` to root only.
- Consider using an automated reverse-proxy (Traefik) or load balancer if you scale.

---

## Verification
- Visit `https://sowmya.qzz.io` after DNS propagation. Use `curl -I https://sowmya.qzz.io` to inspect TLS headers.
- In Google Search Console, verify ownership using meta tag (we already added it in `src/app/layout.tsx`).

---

## Troubleshooting
- If Nginx fails to start: `sudo nginx -t` to debug configuration.
- Check logs: `sudo journalctl -u nginx -e`, `pm2 logs portfolio` or `journalctl -u portfolio` depending on your run method.

---

If you want, I can:

- create `public/robots.txt` and `public/sitemap.xml` in this repo (recommended),
- generate a systemd unit file for the Next.js app instead of `pm2`, or
- push the local workspace to your GitHub remote if you provide a token or confirm you want the commands only.
