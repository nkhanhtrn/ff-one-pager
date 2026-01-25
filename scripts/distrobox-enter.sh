#!/bin/bash
# Quick entry to the Playwright distrobox container

CONTAINER_NAME="one-pager-e2e"

if ! distrobox list | grep -q "$CONTAINER_NAME"; then
  echo "Container '$CONTAINER_NAME' not found."
  echo "Run ./scripts/distrobox-setup.sh first to create it."
  exit 1
fi

distrobox enter "$CONTAINER_NAME"
