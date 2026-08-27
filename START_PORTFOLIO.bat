@echo off
title AI Video Portfolio Local Server
cd /d "%~dp0"

echo.
echo Starting portfolio on http://localhost:5500
echo This is recommended instead of opening index.html with file://
echo.

where py >nul 2>nul
if %errorlevel%==0 (
    start "" http://localhost:5500
    py -m http.server 5500
    goto :eof
)

where python >nul 2>nul
if %errorlevel%==0 (
    start "" http://localhost:5500
    python -m http.server 5500
    goto :eof
)

where npx >nul 2>nul
if %errorlevel%==0 (
    start "" http://localhost:5500
    npx --yes http-server -p 5500
    goto :eof
)

echo.
echo Could not find Python or Node.js on this computer.
echo You can still open index.html directly, but Google Drive embeds
echo and the contact form work more reliably after GitHub Pages deployment.
echo.
pause
