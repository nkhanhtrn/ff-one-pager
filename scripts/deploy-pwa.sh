#!/bin/bash
set -e

# Build PWA
VITE_PWA=true vite build

# Move index.pwa.html to index.html for root access
cp dist/index.pwa.html dist/index.html

# Deploy to gh-pages branch using gh-pages package
npx gh-pages -d dist

echo "PWA deployed to GitHub Pages!"
