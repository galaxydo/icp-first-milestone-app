#!/bin/bash

# Determine the root directory of the Git repository
ROOT_DIR="$(git rev-parse --show-toplevel)"

# Check if 'tree' command is available
if ! command -v tree &> /dev/null; then
  echo "The 'tree' command is not available. Please install it and try again."
  exit 1
fi

# Check if the .gitignore file exists
if [ ! -f "$ROOT_DIR/.gitignore" ]; then
  echo ".gitignore file not found in the root directory: $ROOT_DIR"
  exit 1
fi

# Generate and display the tree structure
tree -a --gitignore
