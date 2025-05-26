@echo off
echo Starting Flask ML API...
start cmd /k "cd ml-api && python serve_model.py"

timeout /t 2 >nul

echo Starting Node.js Backend...
start cmd /k "node server.js"

echo ✅ Both servers started in separate windows.
pause
