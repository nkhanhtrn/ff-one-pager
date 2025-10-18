#!/bin/bash
# Convert SVG icon to PNGs for favicon and extension manifest using inkscape or rsvg-convert
# Usage: bash update-icon.sh

set -e

SRC="public/icon.svg"
OUTDIR="public"
SIZES=(16 32 48 64 96 128 256)

if [ ! -f "$SRC" ]; then
  echo "SVG icon not found: $SRC" >&2
  exit 1
fi


if ! command -v magick &> /dev/null; then
  echo "Error: ImageMagick (magick) is required to generate PNG icons." >&2
  exit 1
fi

for size in "${SIZES[@]}"; do
  OUTPNG="$OUTDIR/icon-$size.png"
  magick -background none -resize ${size}x${size} "$SRC" "$OUTPNG"
  echo "Generated $OUTPNG with ImageMagick magick convert"
done

echo "All PNG icons generated."