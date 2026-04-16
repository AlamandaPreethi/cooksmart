#!/bin/bash
# ============================================================
#  CookSmart — Full EC2 Deployment Script
#  EC2 Public IP : 13.49.244.218
#  GitHub Repo   : https://github.com/AlamandaPreethi/cooksmart
# ============================================================
set -e   # stop on first error

EC2_IP="13.49.244.218"
REPO="https://github.com/AlamandaPreethi/cooksmart.git"
APP_DIR="$HOME/app"

echo ""
echo "=============================================="
echo "  CookSmart — EC2 Auto-Deployment Starting"
echo "=============================================="
echo ""

# ── STEP 1: System update & install Node.js 20 LTS ──────────
echo ">>> [1/7] Updating system and installing Node.js 20..."
sudo apt-get update -y && sudo apt-get upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
echo "    Node $(node -v)  |  npm $(npm -v)  ✓"

# ── STEP 2: Install PM2 globally ────────────────────────────
echo ""
echo ">>> [2/7] Installing PM2..."
sudo npm install -g pm2
echo "    PM2 $(pm2 -v)  ✓"

# ── STEP 3: Clone repo ──────────────────────────────────────
echo ""
echo ">>> [3/7] Cloning repository..."
if [ -d "$APP_DIR" ]; then
  echo "    Directory exists — pulling latest changes..."
  cd "$APP_DIR" && git pull origin main
else
  git clone "$REPO" "$APP_DIR"
fi
echo "    Repo cloned to $APP_DIR  ✓"

# ── STEP 4: Backend setup ────────────────────────────────────
echo ""
echo ">>> [4/7] Setting up backend..."
cd "$APP_DIR/backend"
npm install

# Write .env file
cat > .env << 'ENVEOF'
MONGO_URI=mongodb://alamandapreethi_db_user:Preethi@ac-ncnoe6y-shard-00-00.5y9rvjv.mongodb.net:27017,ac-ncnoe6y-shard-00-01.5y9rvjv.mongodb.net:27017,ac-ncnoe6y-shard-00-02.5y9rvjv.mongodb.net:27017/cooksmart?ssl=true&replicaSet=atlas-gfsv9n-shard-0&authSource=admin&retryWrites=true&w=majority
PORT=5000
JWT_SECRET=supersecretjwtkey_for_cooksmart
FRONTEND_URL=http://13.49.244.218
ENVEOF

echo "    .env created  ✓"

# Kill existing backend on port 5000 if any
echo "    Checking for existing process on port 5000..."
fuser -k 5000/tcp 2>/dev/null || true

# Start / restart with PM2
pm2 delete backend 2>/dev/null || true
pm2 start server.js --name "backend"
echo "    Backend started with PM2  ✓"

# ── STEP 5: Frontend build ───────────────────────────────────
echo ""
echo ">>> [5/7] Building frontend..."
cd "$APP_DIR/frontend"
npm install
npm run build
echo "    Frontend built to $APP_DIR/frontend/dist  ✓"

# ── STEP 6: Nginx config ─────────────────────────────────────
echo ""
echo ">>> [6/7] Configuring Nginx..."

sudo tee /etc/nginx/sites-available/cooksmart > /dev/null << NGINXEOF
server {
    listen 80;
    server_name $EC2_IP;

    root $APP_DIR/frontend/dist;
    index index.html;

    # React Router support
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Reverse proxy API calls to Node.js backend
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
NGINXEOF

# Enable site, remove default
sudo ln -sf /etc/nginx/sites-available/cooksmart /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Fix permissions so Nginx can read the dist folder
sudo chmod -R 755 "$APP_DIR/frontend/dist"
sudo chmod 755 "$HOME"

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable nginx
echo "    Nginx configured and running  ✓"

# ── STEP 7: PM2 auto-start on reboot ────────────────────────
echo ""
echo ">>> [7/7] Setting up PM2 auto-start on reboot..."
pm2 save
pm2 startup systemd -u ubuntu --hp /home/ubuntu | tail -1 | sudo bash
pm2 save
echo "    PM2 startup configured  ✓"

# ── Final status ─────────────────────────────────────────────
echo ""
echo "=============================================="
echo "  ✅  DEPLOYMENT COMPLETE!"
echo "=============================================="
echo ""
echo "  🌐 Your App:  http://$EC2_IP"
echo "  🔌 API:       http://$EC2_IP/api/"
echo ""
echo "  PM2 Status:"
pm2 status
echo ""
echo "  Nginx Status:"
sudo systemctl is-active nginx
echo ""
echo "  Quick API test:"
sleep 2
curl -s -o /dev/null -w "  Backend HTTP status: %{http_code}\n" http://localhost:5000/api/auth/ || echo "  (route may need auth — that's OK)"
echo ""
echo "  Open http://$EC2_IP in your browser!"
echo "=============================================="
