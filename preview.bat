@echo off
setlocal
chcp 65001 >nul

cd /d "%~dp0"
set PREVIEW_PORT=5500
set PREVIEW_PAGE=http://127.0.0.1:5500/OptimusQA.html

netstat -ano | findstr /R /C:":5500 .*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Server is already running on port 5500. Opening browser...
    start "" "%PREVIEW_PAGE%"
    timeout /t 2 >nul
    exit /b 0
)

where python >nul 2>&1
if %errorlevel% equ 0 (
    set PYTHON_CMD=python
) else (
    where py >nul 2>&1
    if %errorlevel% equ 0 (
        set PYTHON_CMD=py
    ) else (
        echo [ERROR] Python not found. Please install Python.
        pause
        exit /b 1
    )
)

echo ========================================
echo Riversoft Web Preview
echo URL: %PREVIEW_PAGE%
echo Press Ctrl+C to stop the server.
echo ========================================

start "" cmd /c "timeout /t 1 >nul && start %PREVIEW_PAGE%"
%PYTHON_CMD% -m http.server 5500 --bind 0.0.0.0

echo.
echo Server stopped.
pause

endlocal