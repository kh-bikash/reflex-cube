from app.cubes.registry import CubeRegistry
import json

def test_sentinel():
    registry = CubeRegistry()
    sentinel = registry.get_cube("sentinel")
    
    if not sentinel:
        print("ERROR: Sentinel Cube not found in registry.")
        return

    print(f"Cube Found: {sentinel.name}")
    
    # Test Normal Mode
    print("\n--- Testing Normal Mode ---")
    result_normal = sentinel.run({"simulation_mode": "normal"})
    print(json.dumps(result_normal, indent=2))

    # Test Attack Mode
    print("\n--- Testing Attack Mode ---")
    result_attack = sentinel.run({"simulation_mode": "attack"})
    print(json.dumps(result_attack, indent=2))

if __name__ == "__main__":
    test_sentinel()
