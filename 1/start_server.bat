@echo off
echo Starting AI Avatar Generator Server...
echo.
echo Make sure you have installed all required dependencies:
echo pip install -r requirements.txt
echo.

REM Check if .env file exists
if not exist .env (
    echo WARNING: .env file not found. Creating from template...
    echo.
    copy .env.example .env
    echo Please edit the .env file and add your REPLICATE_API_TOKEN
    echo.
    pause
    exit
)

python app.py
