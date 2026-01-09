import sys
import os

# Add parent directory to path so we can import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.cubes.sentinel import SentinelCube
import json

def test_sentinel_isolated():
    print("Initializing Sentinel Cube (Isolated)...")
    sentinel = SentinelCube()
    
    print(f"Cube: {sentinel.name}")
    
    # Test Normal Mode
    print("\n--- Testing Normal Mode ---")
    result_normal = sentinel.run({"simulation_mode": "normal"})
    print(json.dumps(result_normal, indent=2))

    # Test Attack Mode
    print("\n--- Testing Attack Mode ---")
    result_attack = sentinel.run({"simulation_mode": "attack"})
    print(json.dumps(result_attack, indent=2))

if __name__ == "__main__":
    test_sentinel_isolated()
