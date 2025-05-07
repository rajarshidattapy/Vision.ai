import os
import json
import uuid
import replicate
import requests
from flask import Flask, render_template, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from PIL import Image
from io import BytesIO

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = os.path.join('static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
MAX_IMAGES = 20
REPLICATE_API_TOKEN = ""

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

# Set the API token for Replicate
os.environ["REPLICATE_API_TOKEN"] = REPLICATE_API_TOKEN

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_images():
    # Check if images are provided
    if 'images' not in request.files:
        return jsonify({'error': 'No images provided'}), 400
    
    files = request.files.getlist('images')
    
    # Validate number of images
    if len(files) < 5:
        return jsonify({'error': f'Please upload at least 5 images. You uploaded {len(files)}'}), 400
    
    if len(files) > MAX_IMAGES:
        return jsonify({'error': f'Maximum {MAX_IMAGES} images allowed. You uploaded {len(files)}'}), 400
    
    # Create a user session ID
    session_id = str(uuid.uuid4())
    session_folder = os.path.join(app.config['UPLOAD_FOLDER'], session_id)
    os.makedirs(session_folder, exist_ok=True)
    
    # Save files
    saved_files = []
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(session_folder, filename)
            file.save(file_path)
            saved_files.append(file_path)
        else:
            return jsonify({'error': f'Invalid file format: {file.filename}. Allowed formats: {", ".join(ALLOWED_EXTENSIONS)}'}), 400
    
    return jsonify({
        'success': True,
        'message': f'Successfully uploaded {len(saved_files)} images',
        'session_id': session_id,
        'files': saved_files
    })

@app.route('/generate', methods=['POST'])
def generate_avatar():
    data = request.json
    if not data or 'session_id' not in data:
        return jsonify({'error': 'Invalid request data'}), 400
    
    session_id = data['session_id']
    num_avatars = data.get('num_avatars', 3)  # Default to 3 avatars
    style = data.get('style', 'realistic')  # Default style
    gender = data.get('gender', 'neutral')  # Default gender
    
    session_folder = os.path.join(app.config['UPLOAD_FOLDER'], session_id)
    if not os.path.exists(session_folder):
        return jsonify({'error': 'Session not found'}), 404
    
    # Get all image paths in the session folder
    image_paths = [os.path.join(session_folder, f) for f in os.listdir(session_folder) 
                  if os.path.isfile(os.path.join(session_folder, f)) and allowed_file(f)]
    
    # Create output folder for the generated avatars
    avatars_folder = os.path.join(session_folder, 'avatars')
    os.makedirs(avatars_folder, exist_ok=True)
    
    try:
        # Call to Replicate API using the Tryon model for avatar generation
        # Using "dreambooth-v1" model as an example for personalized avatar generation
        # We'll use dreamboothinit to create a custom model based on the uploaded images
        
        # For this example, we're using the stable-diffusion model with dreambooth fine-tuning
        # This is a simplification - in a production environment you'd need to handle the fine-tuning process more carefully
        
        # Create a unique identifier for this user's custom model
        unique_identifier = f"person-{session_id[:8]}"
        
        # Prepare training data - in production you would need to prepare these images more carefully
        # Here we're simulating the process
        
        results = []
        
        # In a real implementation, you'd first train a custom model on these images
        # But for demo purposes, we'll use a pre-existing stable diffusion model with prompts
        model = "stability-ai/stable-diffusion-xl-base-1.0"
        
        for i in range(num_avatars):
            prompt = f"A photorealistic portrait avatar of a {gender} person, {style} style, 8k ultra detailed"
            
            # Generate avatar using Replicate API
            output = replicate.run(
                model,
                input={
                    "prompt": prompt,
                    "negative_prompt": "distorted, blurry, disfigured, mutation, extra limbs",
                    "width": 768,
                    "height": 768,
                    "num_outputs": 1,
                    "scheduler": "K_EULER_ANCESTRAL",
                    "num_inference_steps": 50
                }
            )
            
            # Download the generated image
            avatar_url = output[0]
            avatar_response = requests.get(avatar_url)
            
            if avatar_response.status_code == 200:
                # Save the avatar
                avatar_filename = f"avatar_{i+1}.png"
                avatar_path = os.path.join(avatars_folder, avatar_filename)
                
                # Save the image using PIL
                img = Image.open(BytesIO(avatar_response.content))
                img.save(avatar_path)
                
                results.append({
                    'id': i+1,
                    'filename': avatar_filename,
                    'path': f'/static/uploads/{session_id}/avatars/{avatar_filename}'
                })
        
        return jsonify({
            'success': True,
            'avatars': results,
            'session_id': session_id
        })
    
    except Exception as e:
        print(f"Error generating avatars: {str(e)}")
        return jsonify({'error': f'Failed to generate avatars: {str(e)}'}), 500

@app.route('/download/<session_id>/<filename>')
def download_avatar(session_id, filename):
    avatar_folder = os.path.join(app.config['UPLOAD_FOLDER'], session_id, 'avatars')
    return send_from_directory(avatar_folder, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)