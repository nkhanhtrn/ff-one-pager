#!/bin/bash

echo "Building and packaging Firefox extension..."
echo "Zipping source files..."
# Remove any existing release artifacts
set -e
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/.."
cd "$PROJECT_ROOT"
echo "Cleaning up previous build artifacts..."
rm -rf release/firefox
mkdir -p release/firefox
rm -rf dist

echo "Building and packaging Firefox extension..."
TARGET_BROWSER=firefox vite build
web-ext build --source-dir=dist --artifacts-dir=release/firefox --overwrite-dest

echo "Zipping source files..."
sh "$SCRIPT_DIR/zip-source.sh" "$PROJECT_ROOT/release/firefox"
