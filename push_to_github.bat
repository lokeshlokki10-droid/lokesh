@echo off
set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%PATH%"
cd /d "%~dp0"
echo ========================================================
echo  Pushing Portfolio to GitHub (lokeshlokki10-droid/lokesh)
echo ========================================================
git push -u origin main
echo.
pause
