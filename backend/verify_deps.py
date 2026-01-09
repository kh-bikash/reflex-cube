import sys
print(f"Python Version: {sys.version}")

try:
    import numpy
    print(f"NumPy Version: {numpy.__version__}")
except ImportError as e:
    print(f"NumPy Import Failed: {e}")

try:
    import pandas
    print(f"Pandas Version: {pandas.__version__}")
except ImportError as e:
    print(f"Pandas Import Failed: {e}")

try:
    import torch
    print(f"Torch Version: {torch.__version__}")
except ImportError as e:
    print(f"Torch Import Failed: {e}")

try:
    from transformers import pipeline, trainer
    print("Transformers Imported Successfully")
except ImportError as e:
    print(f"Transformers Import Failed: {e}")
except Exception as e:
    print(f"Transformers Crash: {e}")
