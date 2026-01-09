from typing import Dict, Type
from .base import Cube

# Robust Import Logic
# We import cubes inside the registry init or try-catch block to prevent one broken cube from killing the app.
import traceback

class CubeRegistry:
    def __init__(self):
        self._cubes: Dict[str, Cube] = {}
        self._register_defaults()

    def _register_defaults(self):
        # Helper to safely register cubes
        def safe_register(CubeClass):
            try:
                cube_instance = CubeClass()
                self.register(cube_instance.id, cube_instance)
                print(f"[Registry] Successfully loaded {cube_instance.id}")
            except Exception as e:
                print(f"[Registry] FAILED to load {CubeClass.__name__}: {e}")
                # traceback.print_exc()

        # Dynamic Import List
        cubes_to_load = [
            ("chef", "ChefCube"),
            ("alpha", "AlphaCube"),
            ("nexus", "NexusCube"),
            ("lens", "LensCube"),
            ("career", "CareerCube"),
            ("brand", "BrandCube"),
            ("legal", "LegalCube"),
            ("fitpal", "FitPalCube"),
            ("travel", "TravelCube"),
            ("sentinel", "SentinelCube"),
            ("ledger", "LedgerCube"),
            ("talent", "TalentCube")
        ]

        import importlib
        for module_name, class_name in cubes_to_load:
            try:
                # Dynamically import the module relative to 'app.cubes'
                module = importlib.import_module(f".{module_name}", package="app.cubes")
                # Get the class from the module
                CubeClass = getattr(module, class_name)
                
                # Instantiate
                cube_instance = CubeClass()
                
                # Register using the ID from our list (module_name)
                # This fixes the "object has no attribute 'id'" error
                self.register(module_name, cube_instance)
                print(f"[Registry] Successfully loaded {module_name}")
            except Exception as e:
                print(f"[Registry] CRITICAL: Could not import {class_name} from {module_name}: {e}")
                # traceback.print_exc()

    def register(self, cube_id: str, cube_instance: Cube):
        self._cubes[cube_id] = cube_instance

    def get_cube(self, cube_id: str) -> Cube:
        return self._cubes.get(cube_id)

    def list_cubes(self):
        return [{"id": k, "name": v.name, "description": v.description} for k, v in self._cubes.items()]

# Singleton Instance
registry = CubeRegistry()
