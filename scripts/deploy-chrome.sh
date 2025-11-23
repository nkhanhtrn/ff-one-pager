#!/bin/bash

echo "Building and packaging Chrome extension..."
echo "Zipping source files..."
# Remove any existing release artifacts
set -e

# Run test coverage before deploying
npm run test:coverage
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/.."
cd "$PROJECT_ROOT"
echo "Cleaning up previous build artifacts..."
rm -rf release/chrome
mkdir -p release/chrome
rm -rf dist

echo "Building and packaging Chrome extension..."
TARGET_BROWSER=chrome vite build
web-ext build --source-dir=dist --artifacts-dir=release/chrome --overwrite-dest

echo "Zipping source files..."
sh "$SCRIPT_DIR/zip-source.sh" "$PROJECT_ROOT/release/chrome"
