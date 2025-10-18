#!/bin/bash
# Zip all source code for review, excluding node_modules, hidden folders, and release artifacts
# Usage: ./zip-source.sh

set -e

ZIPNAME="ff-one-pager-source-$(date +%Y%m%d).zip"

zip -r "$ZIPNAME" . \
  -x "node_modules/*" \
     "node_modules" \
     "web-ext-artifacts/*" \
     "web-ext-artifacts" \
     "dist/*" \
     "dist" \
     ".*" \
     "*/.*" \
     "*.zip" \
     "*.tar.gz" \
     "*.tgz" \
     "*.DS_Store" \
     "*.log" \
     "*.lock" \
     "*.env*"

echo "Source code zipped to $ZIPNAME"
