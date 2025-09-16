@echo off
echo Deploying DL Details Application to GitHub and Netlify...
echo.

echo Step 1: Building the application...
npm run build
if %errorlevel% neq 0 (
    echo Build failed! Please check for errors.
    pause
    exit /b 1
)

echo.
echo Step 2: Adding files to Git...
git add .

echo.
echo Step 3: Committing changes...
git commit -m "Deploy DL Details application - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

echo.
echo Step 4: Pushing to GitHub...
git push origin main

echo.
echo ✅ Deployment complete!
echo.
echo Your application will be automatically deployed to Netlify.
echo Check your Netlify dashboard for the live URL.
echo.
pause
