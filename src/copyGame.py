#this is not necessary anymore
exit(0)
import os
import shutil
import subprocess
import argparse

# Parse command line arguments
parser = argparse.ArgumentParser(description='Copy game files with optional git update.')
parser.add_argument('--update', action='store_true', help='Update git submodules before copying files')
args = parser.parse_args()

# Update git submodules if --update flag is provided
if args.update:
    git = subprocess.run(["git", "submodule", "update", "--recursive", "--remote"], capture_output=True)
    print(f'Git submodule update: {git.stdout.decode()}')

# Define source and destination directories
current_dir = os.getcwd()
print(f'Current directory: {current_dir}')
source_dir = os.path.join(current_dir, 'consoleadventure')
source_dir = os.path.join(source_dir, 'Game')
destination_dir = os.path.join(current_dir, 'src')
destination_dir = os.path.join(destination_dir, 'Game')
print(f'Source directory: {source_dir}')
print(f'Destination directory: {destination_dir}')




# Create destination directory if it doesn't exist
os.makedirs(destination_dir, exist_ok=True)

# Copy files from source to destination
for filename in os.listdir(source_dir):
    source_file = os.path.join(source_dir, filename)
    destination_file = os.path.join(destination_dir, filename)
    if os.path.isfile(source_file):
        if os.path.exists(destination_file):
            os.remove(destination_file)
        shutil.copy(source_file, destination_file)
        print(f'Copied {source_file} to {destination_file}')
    elif os.path.isdir(source_file):
        if os.path.exists(destination_file):
            shutil.rmtree(destination_file)
        shutil.copytree(source_file, destination_file)
        print(f'Copied {source_file} to {destination_file}')