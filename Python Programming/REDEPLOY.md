# Force Redeploy for Test Run Feature

## Issue
Deployed version doesn't have `/api/test_run` endpoint yet, causing "Method Not Allowed" error.

## Solution
Make a small change to force Render redeployment:

1. Add this comment to app.py
2. Commit and push
3. Render will auto-redeploy with new endpoint

## Status
- Local code has test_run endpoint ✅
- Deployed version missing test_run endpoint ❌
- Need to force redeploy
