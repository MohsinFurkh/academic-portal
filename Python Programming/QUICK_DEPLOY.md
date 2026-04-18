# Quick Deployment Guide

## Current Status
- **Backend**: Deployed and working on Render
- **Frontend**: API URL fixed, needs GitHub Pages deployment

## API Status
- **URL**: https://academic-portal-y4my.onrender.com/api
- **Health**: Working
- **CORS**: Configured for GitHub Pages

## Steps to Fix "Failed to fetch" Error

### 1. Test API Connection
Open `test-api.html` in your browser to verify API works.

### 2. Deploy Frontend to GitHub Pages
1. Push changes to GitHub:
```bash
git add .
git commit -m "Fix API URL for remote server"
git push origin main
```

2. Enable GitHub Pages:
- Go to your repository on GitHub
- Settings > Pages
- Source: Deploy from a branch
- Branch: main
- Folder: / (root)
- Click Save

3. Wait 2-3 minutes for deployment

### 3. Test Full Integration
Visit your GitHub Pages URL and test the interactive test.

## Troubleshooting
If still getting "Failed to fetch":
1. Check browser console (F12) for specific error
2. Verify GitHub Pages URL matches CORS origin
3. Clear browser cache
4. Try incognito mode

## URLs
- **Backend API**: https://academic-portal-y4my.onrender.com/api
- **Health Check**: https://academic-portal-y4my.onrender.com/health
- **Frontend**: Your GitHub Pages URL
