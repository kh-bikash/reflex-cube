import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from app.db import init_db

if __name__ == "__main__":
    try:
        init_db()
        print("DB Initialized Successfully")
    except Exception as e:
        print(f"Error: {e}")
