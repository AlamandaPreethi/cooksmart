#!/bin/bash
# ============================================================
#  CookSmart — EC2 Deployment Script (Ubuntu)
#  EC2 Public IP : 13.49.244.218 
#  GitHub Repo   : https://github.com/AlamandaPreethi/cooksmart
#  User          : ubuntu (Ubuntu)
# ============================================================
set -e

EC2_IP="13.49.244.218" # UPDATE THIS IF YOUR AWS IP IS DIFFERENT
REPO="https://github.com/AlamandaPreethi/cooksmart.git"
APP_DIR="/home/ubuntu/app"
WHOAMI=$(whoami)

echo ""
echo "=============================================="
echo "  CookSmart — EC2 Deployment (Ubuntu)"
echo "  Running as: $WHOAMI"
echo "=============================================="
echo ""

# ── STEP 1: System update ────────────────────────────────────
echo ">>> [1/7] Updating system packages and installing git..."
sudo apt update -y
sudo apt install -y git curl psmisc
echo "    System updated + git installed  ✓"

# ── STEP 2: Install Node.js 20 via NVM ──────────────────────
echo ""
echo ">>> [2/7] Installing Node.js 20 via NVM..."

# Install NVM
export NVM_DIR="$HOME/.nvm"
if [ ! -d "$NVM_DIR" ]; then
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Make node/npm available system-wide for PM2/Nginx
NODE_PATH=$(which node)
NPM_PATH=$(which npm)
sudo ln -sf "$NODE_PATH" /usr/local/bin/node 2>/dev/null || true
sudo ln -sf "$NPM_PATH" /usr/local/bin/npm 2>/dev/null || true

echo "    Node $(node -v)  |  npm $(npm -v)  ✓"

# ── STEP 3: Install PM2 globally ─────────────────────────────
echo ""
echo ">>> [3/7] Installing PM2 and Nginx..."
npm install -g pm2

# Install Nginx
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

echo "    PM2 and Nginx installed  ✓"

# ── STEP 4: Clone / update repo ──────────────────────────────
echo ""
echo ">>> [4/7] Cloning repository..."
if [ -d "$APP_DIR" ]; then
  echo "    Existing app found — pulling latest changes..."
  cd "$APP_DIR" && git pull origin main
else
  git clone "$REPO" "$APP_DIR"
fi
echo "    Repo ready at $APP_DIR  ✓"

# ── STEP 5: Backend setup ─────────────────────────────────────
echo ""
echo ">>> [5/7] Setting up backend..."
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

# Kill any existing process on port 5000
sudo fuser -k 5000/tcp 2>/dev/null || true

# Start backend with PM2
pm2 delete backend 2>/dev/null || true
pm2 start server.js --name "backend"
pm2 save
echo "    Backend started with PM2  ✓"

# ── STEP 6: Frontend build ────────────────────────────────────
echo ""
echo ">>> [6/7] Building frontend (Vite)..."
cd "$APP_DIR/frontend"
npm install
npm run build
echo "    Frontend built to $APP_DIR/frontend/dist  ✓"

# ── STEP 7: Configure Nginx ───────────────────────────────────
echo ""
echo ">>> [7/7] Configuring Nginx..."

sudo tee /etc/nginx/conf.d/cooksmart.conf > /dev/null << NGINXEOF
server {
    listen 80;
    server_name $EC2_IP;

    root $APP_DIR/frontend/dist;
    index index.html;

    # React Router support
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Reverse proxy — API calls to Node.js on port 5000
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

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
NGINXEOF

# Remove default Nginx page (Ubuntu location)
sudo rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# Fix permissions
sudo chmod -R 755 "$APP_DIR/frontend/dist"
sudo chmod 755 /home/ubuntu

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
echo "    Nginx configured  ✓"

# ── PM2 startup on reboot ─────────────────────────────────────
echo ""
echo ">>> Setting up PM2 auto-start on reboot..."
pm2 save
# Generate startup command and run it
PM2_STARTUP=$(pm2 startup systemd -u ubuntu --hp /home/ubuntu | grep "sudo env")
if [ -n "$PM2_STARTUP" ]; then
  eval "$PM2_STARTUP"
fi
pm2 save
echo "    PM2 auto-start configured  ✓"

# ── Final status ──────────────────────────────────────────────
echo ""
echo "=============================================="
echo "  ✅  DEPLOYMENT COMPLETE!"
echo "=============================================="
echo ""
echo "  🌐 Your App : http://$EC2_IP"
echo "  🔌 API      : http://$EC2_IP/api/"
echo ""
echo "  PM2 Processes:"
pm2 status
echo ""
echo "  Nginx Status: $(sudo systemctl is-active nginx)"
echo ""
sleep 2
curl -s -o /dev/null -w "  Backend health: HTTP %{http_code}\n" http://localhost:5000/ || true
echo ""
echo "  👉 Open http://$EC2_IP in your browser!"
echo "=============================================="
