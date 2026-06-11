import sys
import os
import base64
import json

# Add current directory to path so we can import app
sys.path.append(os.getcwd())

from app.cubes.chef import ChefCube

def reproduce():
    print("Initializing Chef Cube...")
    chef = ChefCube()
    
    # Load image
    img_path = r"d:\Projects\reflexcube-v2\frontend\src\assets\hero-cube.jpg"
    if not os.path.exists(img_path):
        print(f"Error: Image not found at {img_path}")
        # Try to find any jpg in storage if hero-cube is missing?
        # But for now just fail
        return

    print(f"Loading image from {img_path}...")
    with open(img_path, "rb") as f:
        img_data = f.read()
        b64_img = base64.b64encode(img_data).decode('utf-8')
    
    print("Running Chef Cube...")
    try:
        result = chef.run({"image": b64_img})
        print("\n--- RESULT ---")
        print(json.dumps(result, indent=2))
    except Exception as e:
        print(f"\n--- ERROR ---")
        print(e)
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    reproduce()
