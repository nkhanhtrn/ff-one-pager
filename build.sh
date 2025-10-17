#!/bin/bash

# Helper script to rebuild and package the extension

echo "🔨 Building Vue.js app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📦 Your Firefox extension is ready!"
    echo ""
    echo "To load it in Firefox:"
    echo "1. Open Firefox and go to: about:debugging#/runtime/this-firefox"
    echo "2. Click 'Load Temporary Add-on...'"
    echo "3. Navigate to this folder and select 'manifest.json'"
    echo ""
    echo "The extension popup will appear when you click the extension icon in the toolbar."
else
    echo "❌ Build failed!"
    exit 1
fi
