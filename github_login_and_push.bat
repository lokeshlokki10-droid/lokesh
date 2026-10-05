@echo off
title GitHub Login and Push - Lokesh T Portfolio
set "PATH=%LOCALAPPDATA%\Programs\GitHubCLI;%LOCALAPPDATA%\Programs\MinGit\cmd;%PATH%"
cd /d "%~dp0"

echo ================================================================
echo       AUTHENTICATING & PUSHING LOKESH T'S PORTFOLIO
echo ================================================================
echo.
echo 1. Signing in to GitHub...
echo (A browser window will open with a one-time verification code)
echo.

gh auth login --web -h github.com -p https

echo.
echo 2. Configuring Git credentials...
gh auth setup-git

echo.
echo 3. Pushing to https://github.com/lokeshlokki10-droid/lokesh.git ...
git push -u origin main

echo.
echo ================================================================
echo  SUCCESS! Your portfolio code is now live on GitHub!
echo ================================================================
pause
