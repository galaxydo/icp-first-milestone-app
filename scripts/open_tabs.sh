#!/bin/bash

# Get the directory of the script
script_dir=$(dirname "$(realpath "$0")")

# Default input file path
DEFAULT_INPUT_FILE="$script_dir/tabs.txt"

# Initialize variables
INPUT_FILE=""
key=""

# Parse named arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --key)
      key="$2"
      shift 2
      ;;
    *)
      INPUT_FILE="$1"
      shift
      ;;
  esac
done

# If no input file is provided, use the default
if [[ -z "$INPUT_FILE" ]]; then
  INPUT_FILE="$DEFAULT_INPUT_FILE"
fi

# Check if the input file exists
if [[ ! -f "$INPUT_FILE" ]]; then
  echo "Input file not found: $INPUT_FILE"
  exit 1
fi

# Export PATH to include the directory where entr is located
export PATH=$PATH:/opt/homebrew/bin

# Function to execute a command in a new tab
execute_command() {
  local label="$1"
  local command="$2"
  echo "Executing command in $label: $command"
  tab_id=$(kitty @ launch --type=tab --keep-focus --cwd=current -- zsh -c "
    source ~/.zshrc;
    $command")
  if [[ $? -ne 0 ]]; then
    echo "Failed to execute command in $label: $command"
  else
    kitty @ set-tab-title --match id:$tab_id "$label"
    echo "Successfully executed command in $label: $command"
  fi
}

# Check if a key argument is provided
if [[ -n "$key" ]]; then
  # Read commands from the input file and launch the command matching the key in a new tab
  while IFS=: read -r label command; do
    if [[ "$label" == "$key" ]]; then
      if [[ -n "$command" ]]; then
        execute_command "$label" "$command"
      fi
      exit 0
    fi
  done < "$INPUT_FILE"
  echo "Key not found: $key"
  exit 1
else
  # Read commands from the input file and launch each in a new tab
  while IFS=: read -r label command; do
    if [[ -n "$command" ]]; then
      execute_command "$label" "$command"
    fi
  done < "$INPUT_FILE"
fi
