# Google Sheets API Setup for Visitor Logging

Your site uses a Netlify function to log visitor data to Google Sheets. This requires Google Cloud credentials.

## 🔑 Required Environment Variables

Your Netlify function needs these environment variables:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

## 📋 Step-by-Step Setup

### 1. Get Your Google Service Account Credentials

You already have a working setup in your Star Trek vs Star Wars project. Let's reuse those same credentials:

#### Option A: Copy from Existing Netlify Site

1. **Go to your working site's Netlify dashboard:**
   - Site: Star Trek vs Star Wars
   - Go to: **Site Settings** → **Environment Variables**

2. **Copy these variables:**
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`

3. **Add them to this site:**
   - Go to your new site's dashboard: **Site Settings** → **Environment Variables**
   - Click **"Add a variable"**
   - Add `GOOGLE_SERVICE_ACCOUNT_EMAIL` with the copied value
   - Add `GOOGLE_PRIVATE_KEY` with the copied value (it's a long multi-line key)

#### Option B: Get New Credentials from Google Cloud

If you need new credentials or want a separate service account:

1. **Go to Google Cloud Console**
   - Visit: [console.cloud.google.com](https://console.cloud.google.com)
   - Select your project (or create a new one)

2. **Enable Google Sheets API**
   - Go to: **APIs & Services** → **Library**
   - Search for "Google Sheets API"
   - Click **Enable**

3. **Create Service Account**
   - Go to: **APIs & Services** → **Credentials**
   - Click **"Create Credentials"** → **"Service Account"**
   - Name: `netlify-visitor-logger` (or any name)
   - Click **Create and Continue**
   - Skip optional steps, click **Done**

4. **Create Key**
   - Click on the service account you just created
   - Go to **Keys** tab
   - Click **"Add Key"** → **"Create new key"**
   - Choose **JSON** format
   - Download the JSON file

5. **Extract Credentials from JSON**
   The downloaded JSON contains:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "netlify-visitor-logger@your-project.iam.gserviceaccount.com",
     ...
   }
   ```

   You need:
   - `client_email` → Use for `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → Use for `GOOGLE_PRIVATE_KEY`

### 2. Share Google Sheet with Service Account

Your spreadsheet ID is already in the code: `1NDJC3E6n9rGkILd0IKI58vksBSW9eAJQ9gDTzBzoWbs`

**Grant the service account access:**

1. Open the Google Sheet: [https://docs.google.com/spreadsheets/d/1NDJC3E6n9rGkILd0IKI58vksBSW9eAJQ9gDTzBzoWbs](https://docs.google.com/spreadsheets/d/1NDJC3E6n9rGkILd0IKI58vksBSW9eAJQ9gDTzBzoWbs)

2. Click **Share** button

3. Add the service account email (looks like):
   ```
   netlify-visitor-logger@your-project.iam.gserviceaccount.com
   ```

4. Give it **Editor** permissions

5. Click **Send**

### 3. Add Environment Variables to Netlify

1. **Go to Netlify Dashboard:**
   - Your site: [theretotallyissoundinspace.allthethings.dev](https://theretotallyissoundinspace.allthethings.dev)
   - Navigate to: **Site Settings** → **Environment Variables**

2. **Add GOOGLE_SERVICE_ACCOUNT_EMAIL:**
   - Click **"Add a variable"**
   - Key: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Value: `your-service-account@project.iam.gserviceaccount.com`
   - Scopes: All scopes (or specific to production)
   - Click **Create variable**

3. **Add GOOGLE_PRIVATE_KEY:**
   - Click **"Add a variable"** again
   - Key: `GOOGLE_PRIVATE_KEY`
   - Value: Paste the entire private key including:
     ```
     -----BEGIN PRIVATE KEY-----
     MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
     ... (many lines) ...
     -----END PRIVATE KEY-----
     ```
   - ⚠️ **IMPORTANT:** Include the entire key with `\n` characters as they appear in the JSON
   - Click **Create variable**

### 4. Redeploy Your Site

After adding environment variables, you need to redeploy:

**Option 1 - Trigger Redeploy (Fastest):**
1. Go to **Deploys** tab in Netlify
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

**Option 2 - Push to GitHub:**
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

### 5. Verify It Works

1. Visit your site: [https://theretotallyissoundinspace.allthethings.dev/](https://theretotallyissoundinspace.allthethings.dev/)
2. Open Chrome DevTools (F12) → Console
3. Should see: `✅ Visit logged successfully`
4. Check your Google Sheet - a new row should appear!

## 🔍 Troubleshooting

### Still getting "client_email field" error?

**Check environment variables are set:**
```bash
# In Netlify function logs, you should NOT see these as undefined
console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL); // Should show email
```

If they're undefined:
- Make sure you clicked **"Create variable"** (not just "Save")
- Redeploy after adding variables
- Check variable scopes (should be available in production)

### "Insufficient Permission" error?

- Make sure the service account email is shared on the Google Sheet
- The service account needs **Editor** access
- Double-check the spreadsheet ID in `log-visit.js` line 103

### Private key format issues?

The private key should be a single string with `\n` characters:
```
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n
```

In the Netlify UI, paste it exactly as it appears in the JSON file.

### Function timeout?

- Check Netlify function logs: **Functions** tab → **log-visit** → View logs
- Google Sheets API calls should complete in < 1 second
- If timing out, check network/API issues

## 📊 Google Sheet Structure

Your function expects these sheets:

**visitor_logs** (default):
- Columns: Date, Root Domain, Referrer, UrlPath, IP, Country, City, Region, Coordinates, SessionID, Device, UserAgent, Screen, Language

**page_views** (optional):
- Same structure as visitor_logs
- Use by passing `sheetName: "page_views"` in the request

## 🔐 Security Notes

- ✅ Private keys are stored securely in Netlify environment variables
- ✅ Never commit private keys to Git
- ✅ Service accounts have limited access (only to shared sheets)
- ✅ Rotate keys if compromised

## 🎯 Quick Checklist

- [ ] Copy environment variables from working Star Trek site
- [ ] OR Create new service account in Google Cloud
- [ ] Add `GOOGLE_SERVICE_ACCOUNT_EMAIL` to Netlify
- [ ] Add `GOOGLE_PRIVATE_KEY` to Netlify
- [ ] Share Google Sheet with service account email
- [ ] Trigger redeploy in Netlify
- [ ] Test the site and check function logs
- [ ] Verify new row appears in Google Sheet

---

**Once configured, visitor logging will work automatically for all future visitors!** 🎉
