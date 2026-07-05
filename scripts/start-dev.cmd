@echo off
setlocal
cd /d "%~dp0.."
set "Path=C:\Program Files\nodejs;%CD%\node_modules\.bin;C:\WINDOWS\system32;C:\WINDOWS"
"C:\Program Files\nodejs\node.exe" "node_modules\next\dist\bin\next" dev --hostname 127.0.0.1 --port 3000
