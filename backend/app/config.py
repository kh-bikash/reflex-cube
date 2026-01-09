import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

HF_HOME = Path(r"D:\ReflexCubeData\huggingface")
HF_HOME.mkdir(parents=True, exist_ok=True)
os.environ["HF_HOME"] = str(HF_HOME)
os.environ["HF_DATASETS_CACHE"] = str(HF_HOME / "datasets")
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/reflex.db")
STORAGE_PATH = str(Path(r"D:\ReflexCubeData\models"))
Path(STORAGE_PATH).mkdir(parents=True, exist_ok=True)

print(f"[Config] Storage path set to: {STORAGE_PATH}")
print(f"[Config] HF cache path set to: {HF_HOME}")
