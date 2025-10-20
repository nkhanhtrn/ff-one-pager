
#!/bin/bash

# Remove any existing zip files to prevent UsageError
echo "Cleaning up previous build artifacts..."
rm -rf web-ext-artifacts
rm -rf dist

echo "Building and packaging Firefox extension..."
npm run release:firefox

echo "Zipping source files..."
sh zip-source.sh
