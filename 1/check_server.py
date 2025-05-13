import os
import sys
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def check_replicate_api():
    """Check if the Replicate API token is properly set up"""
    api_token = os.environ.get("REPLICATE_API_TOKEN")
    if not api_token:
        print("❌ REPLICATE_API_TOKEN not found in environment variables")
        print("   Create a .env file with your API token like this:")
        print("   REPLICATE_API_TOKEN=r8_your_token_here")
        return False
    
    # Check if token is valid by making a simple API request
    try:
        headers = {
            "Authorization": f"Token {api_token}",
            "Content-Type": "application/json"
        }
        response = requests.get("https://api.replicate.com/v1/collections", headers=headers)
        
        if response.status_code == 200:
            print("✅ Replicate API token is valid")
            return True
        else:
            print(f"❌ Replicate API token is invalid (Status code: {response.status_code})")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error checking Replicate API: {str(e)}")
        return False

def check_folders():
    """Check if required folders exist"""
    upload_folder = os.path.join('static', 'uploads')
    if not os.path.exists(upload_folder):
        print(f"❌ Upload folder {upload_folder} does not exist")
        try:
            os.makedirs(upload_folder, exist_ok=True)
            print(f"✅ Created upload folder: {upload_folder}")
        except Exception as e:
            print(f"❌ Failed to create upload folder: {str(e)}")
            return False
    else:
        print(f"✅ Upload folder exists: {upload_folder}")
    
    return True

def check_packages():
    """Check if required packages are installed"""
    required_packages = ["flask", "werkzeug", "pillow", "python-dotenv", "requests", "replicate"]
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"✅ Package {package} is installed")
        except ImportError:
            print(f"❌ Package {package} is not installed")
            missing_packages.append(package)
    
    if missing_packages:
        print("\nInstall missing packages with:")
        print(f"pip install {' '.join(missing_packages)}")
        return False
    
    return True

if __name__ == "__main__":
    print("\n=== AI Avatar Generator Server Check ===\n")
    
    api_ok = check_replicate_api()
    folders_ok = check_folders()
    packages_ok = check_packages()
    
    print("\n=== Summary ===")
    if api_ok and folders_ok and packages_ok:
        print("✅ All checks passed! The server should work correctly.")
        print("\nRun the server with:")
        print("python app.py")
    else:
        print("❌ Some checks failed. Please fix the issues above before running the server.")
    
    print("\nIf you still experience network errors:")
    print("1. Make sure the Flask server is running while using the web interface")
    print("2. Check for any firewall or antivirus blocking your connections")
    print("3. Try accessing the server at http://127.0.0.1:5000 instead of localhost")
    print("4. Check the terminal where the server is running for error messages")
