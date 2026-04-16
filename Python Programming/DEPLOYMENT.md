# Python Programming Test - Render Deployment Guide

## Overview
This guide explains how to deploy the Python Programming Test backend to Render for full functionality with GitHub Pages frontend.

## Prerequisites
- GitHub repository with the Python Programming Test files
- Render account (free tier available)
- All files committed to GitHub

## Step 1: Prepare Your Repository

Ensure your repository contains these files:
```
Python Programming/
|-- app.py                    # Flask backend
|-- requirements.txt          # Python dependencies
|-- render.yaml              # Render configuration
|-- .gitignore               # Git ignore file
|-- Exercises/
|   |-- questions.json       # Test questions
|-- interactive_test.html    # Frontend (to be updated)
```

## Step 2: Deploy to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Verify your email

### 2.2 Create Web Service
1. Click **"New +"** > **"Web Service"**
2. **Connect Repository**: Select your GitHub repository
3. **Configure Service**:
   - **Name**: `academic-portal` (or your preferred name)
   - **Environment**: `Python 3`
   - **Region**: Choose nearest region
   - **Branch**: `main`
   - **Root Directory**: `Python Programming` (if needed)
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`

### 2.3 Environment Variables
Add these environment variables:
- `PYTHON_VERSION`: `3.9.16`
- `FLASK_ENV`: `production`

### 2.4 Advanced Settings
- **Instance Type**: `Free` (or `Starter` for better performance)
- **Auto-Deploy**: `Enabled` (for automatic updates)

### 2.5 Deploy
Click **"Create Web Service"** and wait for deployment (2-5 minutes)

## Step 3: Get Your API URL

After deployment, Render will provide:
```
Service URL: https://python-test-api.onrender.com
Health Check: https://python-test-api.onrender.com/health
```

## Step 4: Update Frontend API URL

### 4.1 Update interactive_test.html
Replace the API_BASE constant:
```javascript
const API_BASE = 'https://academic-portal-y4my.onrender.com/';
```

### 4.2 Deploy to GitHub Pages
1. Push changes to GitHub
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)

## Step 5: Test the Integration

1. Visit your GitHub Pages site
2. Enter test details and click "Get Random Question"
3. Verify the test works fully with:
   - Question loading
   - Code evaluation
   - Results display
   - Excel logging (check Render logs)

## Troubleshooting

### Common Issues

**1. "Failed to fetch" Error**
- Check Render service is running
- Verify CORS origins in app.py
- Check API URL in frontend

**2. CORS Errors**
```python
# Update app.py CORS origins
CORS(app, origins=[
    "https://your-username.github.io",  # Your actual GitHub Pages URL
    "http://localhost:3000"
])
```

**3. Build Failures**
- Check requirements.txt format
- Verify Python version compatibility
- Check Render build logs

**4. Excel File Issues**
- Ensure Exercises/questions.json exists
- Check file permissions in Render
- Monitor Render logs for errors

### Monitoring

**Render Dashboard:**
- Service status
- Logs and metrics
- Auto-deploy status
- Performance metrics

**Health Check:**
```bash
curl https://your-service.onrender.com/health
```

## Security Considerations

1. **API Security**: Consider adding API keys for production
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Data Privacy**: Ensure GDPR compliance for student data
4. **HTTPS**: Render provides automatic SSL certificates

## Scaling Options

**Free Tier Limitations:**
- 750 hours/month
- Sleeps after 15 minutes inactivity
- Cold starts (30-second delay)

**Paid Options:**
- **Starter**: $7/month - No sleep, better performance
- **Standard**: $25/month - More resources, dedicated instances

## Maintenance

1. **Regular Updates**: Keep dependencies updated
2. **Backup Data**: Download Excel files periodically
3. **Monitor Logs**: Check for errors and performance issues
4. **Update Questions**: Modify questions.json as needed

## Support

- **Render Documentation**: https://render.com/docs
- **Flask Documentation**: https://flask.palletsprojects.com
- **GitHub Pages**: https://pages.github.com

## Next Steps

1. Deploy backend to Render
2. Update frontend API URL
3. Test full functionality
4. Monitor performance
5. Consider security enhancements

---

**Note**: This deployment provides full functionality including:
- Real Python code execution
- Comprehensive test evaluation
- Excel logging with security data
- All security features (tab switching, copy/paste protection)
- Professional timer and fullscreen mode
