#!/bin/bash
# Zip all source code for review, excluding node_modules, hidden folders, and release artifacts
# Usage: ./zip-source.sh [output_dir]

set -e

OUTDIR="${1:-.}"
mkdir -p "$OUTDIR"
ZIPNAME="$OUTDIR/one-pager-source-$(date +%Y%m%d).zip"

zip -r "$ZIPNAME" . \
  -x "node_modules/*" \
     "node_modules" \
     "web-ext-artifacts/*" \
     "web-ext-artifacts" \
     "dist/*" \
     "dist" \
     "release/*" \
     "release" \
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
