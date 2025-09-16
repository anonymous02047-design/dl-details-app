@echo off
echo Deploying DL Details Application to GitHub Pages...
echo.

echo Step 1: Building the application for production...
set NODE_ENV=production
npm run build
if %errorlevel% neq 0 (
    echo Build failed! Please check for errors.
    pause
    exit /b 1
)

echo.
echo Step 2: Creating .nojekyll file...
echo. > dist\.nojekyll

echo.
echo Step 3: Adding files to Git...
git add dist

echo.
echo Step 4: Committing build...
git commit -m "Deploy to GitHub Pages - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

echo.
echo Step 5: Pushing to gh-pages branch...
git subtree push --prefix dist origin gh-pages

echo.
echo ✅ Deployment complete!
echo.
echo Your application should be available at:
echo https://anonymous02047-design.github.io/dl-details-app/
echo.
pause
