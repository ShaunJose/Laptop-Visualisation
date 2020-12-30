from pathlib import Path

def create_dir(directory):
    Path(directory).mkdir(parents = True, exist_ok = True)
