@echo off
setlocal
chcp 65001 >nul

cd /d "%~dp0"
set "PREVIEW_PORT=5500"
set "PREVIEW_PAGE=http://127.0.0.1:%PREVIEW_PORT%/OptimusQA.html"

netstat -ano | findstr /R /C:":%PREVIEW_PORT% .*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo 預覽服務已在 %PREVIEW_PORT% 執行，正在開啟網站...
    start "" "%PREVIEW_PAGE%"
    timeout /t 2 >nul
    exit /b 0
)

where python >nul 2>&1
if %errorlevel% equ 0 (
    set "PYTHON_CMD=python"
) else (
    where py >nul 2>&1
    if %errorlevel% equ 0 (
        set "PYTHON_CMD=py"
    ) else (
        echo [錯誤] 找不到 Python，請先安裝 Python。
        pause
        exit /b 1
    )
)

echo ========================================
echo Riversoft 網站預覽
echo ========================================
echo 電腦：%PREVIEW_PAGE%
echo 手機：請使用 http://電腦區網IP:%PREVIEW_PORT%/OptimusQA.html
echo.
echo 請保持此視窗開啟；按 Ctrl+C 可停止預覽。
echo ========================================
echo.

start "" "%PREVIEW_PAGE%"
%PYTHON_CMD% -m http.server %PREVIEW_PORT% --bind 0.0.0.0

echo.
echo 預覽服務已停止。
pause

endlocal
