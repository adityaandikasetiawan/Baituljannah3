# 🚀 Deployment Guide - Baituljannah Backend

Panduan lengkap untuk deploy backend API ke production server.

---

## 📋 **Deployment Options**

1. **VPS (Ubuntu/Debian)** - Recommended for full control
2. **Heroku** - Easy deployment
3. **AWS EC2** - Scalable cloud solution
4. **DigitalOcean** - Developer-friendly
5. **Railway** - Modern deployment platform

---

## 🖥️ **Option 1: VPS Deployment (Ubuntu)**

### Prerequisites
- Ubuntu 20.04+ atau Debian 11+
- Root or sudo access
- Domain name (optional)

### Step 1: Setup Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show v9.x.x
```

### Step 2: Install MySQL

```bash
# Install MySQL Server
sudo apt install mysql-server -y

# Secure MySQL
sudo mysql_secure_installation

# Login to MySQL
sudo mysql

# Create database and user
CREATE DATABASE baituljannah_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'baituljannah'@'localhost' IDENTIFIED BY 'StrongPassword123!';
GRANT ALL PRIVILEGES ON baituljannah_db.* TO 'baituljannah'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Clone & Setup Application

```bash
# Create app directory
sudo mkdir -p /var/www/baituljannah
cd /var/www/baituljannah

# Clone repository
git clone https://github.com/your-repo/baituljannah-backend.git backend
cd backend

# Install dependencies (production only)
npm install --production

# Create .env file
cp .env.example .env
nano .env
```

**Production .env:**
```env
NODE_ENV=production
PORT=5000

DB_HOST=localhost
DB_USER=baituljannah
DB_PASSWORD=StrongPassword123!
DB_NAME=baituljannah_db

JWT_SECRET=your_super_long_random_secret_key_min_32_characters_here
JWT_EXPIRE=7d

FRONTEND_URL=https://baituljannah.sch.id

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@baituljannah.sch.id
SMTP_PASSWORD=your_email_app_password
FROM_EMAIL=noreply@baituljannah.sch.id
FROM_NAME=Yayasan Baituljannah
```

### Step 4: Import Database

```bash
# Import schema
mysql -u baituljannah -p baituljannah_db < database/schema.sql

# Import seed data (optional)
mysql -u baituljannah -p baituljannah_db < database/seed.sql
```

### Step 5: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application
pm2 start server.js --name baituljannah-api

# Setup auto-restart on server reboot
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME

# Save PM2 configuration
pm2 save

# Check status
pm2 status

# View logs
pm2 logs baituljannah-api
```

**PM2 Useful Commands:**
```bash
pm2 list                    # List all processes
pm2 restart baituljannah-api # Restart app
pm2 stop baituljannah-api    # Stop app
pm2 delete baituljannah-api  # Delete from PM2
pm2 logs                     # View logs
pm2 monit                    # Monitor resources
```

### Step 6: Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/baituljannah-api
```

**Nginx Config:**
```nginx
server {
    listen 80;
    server_name api.baituljannah.sch.id;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/baituljannah-api /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx on boot
sudo systemctl enable nginx
```

### Step 7: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d api.baituljannah.sch.id

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 8: Setup Firewall

```bash
# Install UFW
sudo apt install ufw -y

# Configure firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 3306  # MySQL (only if external access needed)

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### Step 9: Setup Monitoring & Logging

```bash
# Install monitoring tools
sudo npm install -g pm2-logrotate

# Configure log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

**Create monitoring script:**
```bash
# Create monitor script
nano /var/www/baituljannah/backend/monitor.sh
```

```bash
#!/bin/bash
# Health check script

ENDPOINT="http://localhost:5000/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $ENDPOINT)

if [ $RESPONSE != "200" ]; then
    echo "API is down! Response code: $RESPONSE"
    pm2 restart baituljannah-api
    # Send alert email or notification
fi
```

```bash
# Make executable
chmod +x /var/www/baituljannah/backend/monitor.sh

# Add to crontab (run every 5 minutes)
crontab -e
# Add line:
*/5 * * * * /var/www/baituljannah/backend/monitor.sh
```

---

## ☁️ **Option 2: Heroku Deployment**

### Step 1: Install Heroku CLI

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login
```

### Step 2: Prepare Application

**Create `Procfile`:**
```
web: node server.js
```

**Update package.json:**
```json
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

### Step 3: Deploy

```bash
# Initialize git (if not already)
git init

# Create Heroku app
heroku create baituljannah-api

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
heroku config:set FRONTEND_URL=https://baituljannah.sch.id

# Get database credentials
heroku config:get JAWSDB_URL

# Deploy
git add .
git commit -m "Initial deployment"
git push heroku main

# Open app
heroku open

# View logs
heroku logs --tail
```

---

## 🌊 **Option 3: DigitalOcean App Platform**

### Step 1: Connect Repository

1. Go to DigitalOcean App Platform
2. Click "Create App"
3. Connect your GitHub repository

### Step 2: Configure App

**App Spec:**
```yaml
name: baituljannah-api
region: sgp
services:
  - name: api
    github:
      repo: your-username/baituljannah-backend
      branch: main
    build_command: npm install
    run_command: npm start
    environment_slug: node-js
    http_port: 5000
    instance_count: 1
    instance_size_slug: basic-xxs
    envs:
      - key: NODE_ENV
        value: "production"
      - key: JWT_SECRET
        value: "your_secret_key"
        type: SECRET
    health_check:
      http_path: /health
databases:
  - name: baituljannah-db
    engine: MYSQL
    version: "8"
```

---

## 📊 **Post-Deployment Checklist**

### Security
- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Enable MySQL SSL connection
- [ ] Setup backup strategy
- [ ] Configure rate limiting
- [ ] Enable CORS with specific origins

### Performance
- [ ] Enable gzip compression (already in code)
- [ ] Setup database indexes
- [ ] Configure caching (Redis/Memcached)
- [ ] Enable CDN for static files
- [ ] Database connection pooling (already configured)

### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Setup log aggregation
- [ ] Database monitoring
- [ ] PM2 monitoring

### Backup
- [ ] Automated database backups
- [ ] Code repository backups
- [ ] Environment variables backup
- [ ] Test restore procedure

---

## 🔄 **Continuous Deployment**

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Deploy to VPS
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USERNAME }}
        key: ${{ secrets.VPS_SSH_KEY }}
        script: |
          cd /var/www/baituljannah/backend
          git pull origin main
          npm install --production
          pm2 restart baituljannah-api
```

---

## 🗄️ **Database Backup Strategy**

### Automated Daily Backups

```bash
# Create backup script
nano /var/www/baituljannah/backup.sh
```

```bash
#!/bin/bash
# Database backup script

BACKUP_DIR="/var/backups/baituljannah"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="baituljannah_db"
DB_USER="baituljannah"
DB_PASS="your_password"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u$DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

```bash
# Make executable
chmod +x /var/www/baituljannah/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add line:
0 2 * * * /var/www/baituljannah/backup.sh
```

---

## 📈 **Performance Optimization**

### 1. Database Optimization

```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_created ON news(created_at);
CREATE INDEX idx_ppdb_status ON ppdb_registrations(status);
CREATE INDEX idx_ppdb_jenjang ON ppdb_registrations(jenjang);
```

### 2. Enable MySQL Query Cache

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

```ini
[mysqld]
query_cache_type = 1
query_cache_size = 64M
query_cache_limit = 2M
```

### 3. PM2 Cluster Mode

```bash
# Use all CPU cores
pm2 start server.js -i max --name baituljannah-api
```

---

## 🔍 **Monitoring & Alerts**

### Setup Uptime Monitoring

**Using UptimeRobot (Free):**
1. Create account at uptimerobot.com
2. Add monitor for https://api.baituljannah.sch.id/health
3. Configure alerts via email/SMS

### Setup Error Tracking with Sentry

```bash
npm install @sentry/node
```

**In server.js:**
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV
});

// Add error handler
app.use(Sentry.Handlers.errorHandler());
```

---

## 🎯 **Production Checklist**

### Before Deploy
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Backup strategy in place

### After Deploy
- [ ] API is accessible
- [ ] All endpoints working
- [ ] Database connections stable
- [ ] Logs are being generated
- [ ] Monitoring is active
- [ ] Backups are running

### Regular Maintenance
- [ ] Weekly: Check logs for errors
- [ ] Weekly: Monitor server resources
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review security
- [ ] Quarterly: Test backup restore

---

## 📞 **Support**

For deployment issues:
- Email: devops@baituljannah.sch.id
- GitHub Issues: Create issue with [DEPLOYMENT] tag

---

**🚀 Happy Deploying!**
