# How to Set Up Cron Warmup Job

This guide shows you how to set up a cron job to keep your backend warm and prevent cold starts.

## Method 1: Render Blueprint (Automatic) ✅ Recommended

If you deployed using `render.yaml`, the cron job is already configured!

### Steps:

1. **After your backend deploys**, get your backend URL:
   - Go to Render Dashboard → Your `krawl-backend` service
   - Copy the service URL (e.g., `https://krawl-backend-xxxx.onrender.com`)

2. **Update the cron job's environment variable**:
   - Go to Render Dashboard → `warmup-backend` cron job → **Environment** tab
   - Find `BACKEND_URL` variable
   - Update the value to your actual backend URL
   - Click **Save Changes**

3. **Verify it's running**:
   - Go to the cron job → **Logs** tab
   - You should see logs showing warmup requests every 5 minutes
   - Look for: `✅ Backend warmed up successfully`

That's it! The cron runs automatically every 5 minutes.

---

## Method 2: External Service (UptimeRobot) - Free & Easy

If you didn't use Render Blueprint or want a backup option, use UptimeRobot (free).

### Steps:

1. **Sign up for UptimeRobot** (free):
   - Go to https://uptimerobot.com
   - Create a free account (50 monitors free forever)

2. **Create a new monitor**:
   - Click **Add New Monitor**
   - Monitor Type: Select **HTTP(s)**
   - Friendly Name: `Krawl Backend Warmup`
   - URL: `https://your-backend.onrender.com/api/health/warmup`
     - Replace `your-backend.onrender.com` with your actual backend URL
   - Monitoring Interval: Select **5 minutes**
   - HTTP Method: `GET`
   - HTTP Status Code: `200`
   - Click **Create Monitor**

3. **That's it!** UptimeRobot will ping your backend every 5 minutes automatically.

**Advantages:**
- ✅ Free forever (50 monitors)
- ✅ Works even if Render cron fails
- ✅ Email alerts if backend goes down
- ✅ Dashboard to see uptime history

---

## Method 3: Manual Setup in Render Dashboard

If you want to create the cron job manually without using Blueprint:

### Steps:

1. **In Render Dashboard**:
   - Click **New** → **Cron Job**

2. **Configure the cron job**:
   - Name: `warmup-backend`
   - Schedule: `*/5 * * * *` (every 5 minutes)
   - Plan: `Free`
   - Runtime: `Docker`
   - Dockerfile Path: `./backend/Dockerfile`
   - Docker Context: `./backend`

3. **Set the command**:
   ```bash
   sh -c 'BACKEND_URL="${BACKEND_URL:-https://your-backend.onrender.com}" && curl -f -s -m 10 "$BACKEND_URL/api/health/warmup" || exit 0'
   ```

4. **Set environment variables**:
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `BACKEND_URL` = `https://your-actual-backend-url.onrender.com`

5. **Create the cron job**

---

## Method 4: GitHub Actions (For Public Repos)

If your repo is public, you can use GitHub Actions (free for public repos):

### Steps:

1. **Create the workflow file**:
   - Create `.github/workflows/warmup.yml` in your repo

2. **Add this content** (replace with your backend URL):

```yaml
name: Warmup Backend

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:  # Allow manual trigger

jobs:
  warmup:
    runs-on: ubuntu-latest
    steps:
      - name: Warm up backend
        run: |
          curl -f -s -m 30 \
            https://your-backend.onrender.com/api/health/warmup || \
            echo "Warmup failed (backend might be restarting)"
```

3. **Push to GitHub** - Actions will automatically start running

---

## Verification

After setting up, verify it's working:

1. **Check the warmup endpoint directly**:
   ```bash
   curl https://your-backend.onrender.com/api/health/warmup
   ```
   Should return: `{"status":"WARMED","timestamp":"...","message":"..."}`

2. **Check logs**:
   - **Render cron**: Dashboard → Cron Job → Logs tab
   - **UptimeRobot**: Dashboard → Monitor → Logs
   - **GitHub Actions**: Your repo → Actions tab

3. **Monitor for cold starts**:
   - Check Render dashboard → Your service → Metrics
   - Active instances should stay at 1+ (with `minInstances: 1` set)
   - If you see instances scaling to 0, the cron isn't working

---

## Troubleshooting

### Cron not running?

1. **Check the BACKEND_URL**:
   - Make sure it matches your actual backend URL exactly
   - Include `https://` and no trailing slash

2. **Check cron job logs**:
   - Look for error messages
   - Common issues: Wrong URL, network timeout, authentication errors

3. **Test manually**:
   ```bash
   curl https://your-backend.onrender.com/api/health/warmup
   ```
   Should work without authentication

### Still seeing cold starts?

1. **Verify `minInstances: 1` is set** in your service settings
2. **Check your Render plan** - Free tier may spin down after 15 min even with cron
3. **Consider upgrading to Starter plan** ($7/month) for better persistence

---

## Which Method to Choose?

- **Using Render Blueprint?** → Method 1 (already done!)
- **Want something simple and free?** → Method 2 (UptimeRobot)
- **Want control over the setup?** → Method 3 (Manual Render cron)
- **Public GitHub repo?** → Method 4 (GitHub Actions)

**Recommendation**: Use Method 1 if deploying via Blueprint, or Method 2 (UptimeRobot) as a backup/alternative.

