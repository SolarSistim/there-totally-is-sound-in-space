# Deployment Guide

## 🚀 Continuous Deployment with Netlify

Your repository is now set up for automatic deployments! Every time you push to GitHub, your site will automatically update.

### Option 1: Connect Netlify to GitHub (Recommended)

1. **Sign in to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository: `SolarSistim/there-totally-is-sound-in-space`

3. **Configure Build Settings**
   - **Branch to deploy:** `main`
   - **Build command:** (leave empty - it's a static site)
   - **Publish directory:** `.` (current directory)
   - Netlify will automatically detect your `netlify.toml` configuration

4. **Deploy!**
   - Click "Deploy site"
   - Your site will be live in ~30 seconds
   - You'll get a random URL like `random-name-123456.netlify.app`

5. **Custom Domain (Optional)**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Follow the instructions to configure DNS

### How Continuous Deployment Works

```
Push to GitHub → Netlify detects change → Auto-build → Auto-deploy → Live! 🎉
```

**Every time you:**
- Push commits to the `main` branch
- Merge a pull request
- Make changes through GitHub's web interface

**Netlify will automatically:**
- Build your site
- Run your serverless functions
- Deploy to production
- Update your live URL

### Option 2: Netlify CLI (Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link your repository
netlify link

# Deploy (manual)
netlify deploy --prod
```

## 🔄 GitHub Actions CI

Your repository includes a GitHub Actions workflow that runs on every push:

- ✅ Validates HTML structure
- ✅ Checks for common issues
- ✅ Verifies required files exist
- ✅ Provides build summaries

View workflow runs at:
`https://github.com/SolarSistim/there-totally-is-sound-in-space/actions`

## 📊 Monitoring Your Deployments

### Netlify Dashboard
- **Deploy status:** See real-time build progress
- **Deploy history:** View all past deployments
- **Rollback:** Instantly revert to any previous version
- **Preview deploys:** Automatic previews for pull requests
- **Analytics:** View traffic and performance metrics

### GitHub Integration Benefits

1. **Deploy Previews**
   - Every pull request gets its own preview URL
   - Test changes before merging

2. **Status Checks**
   - See deploy status directly in GitHub
   - Prevent merging broken builds

3. **Instant Rollbacks**
   - One-click rollback to any previous deploy
   - No need to revert Git commits

## 🔐 Environment Variables

If you need to add environment variables (API keys, secrets):

1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add your variables
3. They'll be available to your serverless functions

Example:
```
GOOGLE_API_KEY=your-key-here
```

## 📱 Deploy Notifications

Get notified when deploys succeed or fail:

1. Netlify Dashboard → Settings → Build & deploy → Deploy notifications
2. Add notifications for:
   - Email
   - Slack
   - GitHub commit status
   - Discord webhooks

## 🧪 Testing Before Production

### Preview Branches

Enable branch deploys in Netlify:
1. Settings → Build & deploy → Continuous deployment
2. Enable "Deploy branch previews"
3. Every branch gets its own URL: `branch-name--site-name.netlify.app`

### Local Testing

```bash
# Test locally
npm install -g netlify-cli
netlify dev

# This simulates the Netlify environment locally
# Includes serverless functions
# Opens at http://localhost:8888
```

## 🎯 Deployment Checklist

- [x] Repository pushed to GitHub
- [x] `.gitignore` configured
- [x] `netlify.toml` configured
- [x] GitHub Actions CI set up
- [ ] Connect Netlify to GitHub (do this now!)
- [ ] Configure custom domain (optional)
- [ ] Set up deploy notifications (optional)

## 🆘 Troubleshooting

### Deploy Failed?

1. Check the Netlify deploy log for errors
2. Verify all files are committed and pushed
3. Check that `netlify.toml` is valid
4. Ensure serverless functions are in `netlify/functions/`

### Functions Not Working?

1. Check function logs in Netlify dashboard
2. Verify `node_bundler = "esbuild"` in `netlify.toml`
3. Make sure dependencies are in `package.json`

### Need Help?

- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Support](https://answers.netlify.com/)
- [GitHub Issues](https://github.com/SolarSistim/there-totally-is-sound-in-space/issues)

---

## 🎉 Next Steps

1. **Connect Netlify** (5 minutes)
   - Follow "Option 1" above

2. **Test It!**
   - Make a small change to `index.html`
   - Push to GitHub: `git push`
   - Watch it auto-deploy in Netlify dashboard

3. **Share Your Site!**
   - Get your Netlify URL
   - Start pranking space-sound skeptics! 🌌

---

**Your site is now production-ready with full CI/CD! 🚀**
