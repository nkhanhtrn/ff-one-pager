#!/bin/bash
# Distrobox setup for Playwright E2E tests
# This script creates a distrobox container with all dependencies needed for Playwright

set -e

CONTAINER_NAME="one-pager-e2e"
IMAGE="ubuntu:24.04"

echo "Creating distrobox container '$CONTAINER_NAME'..."

# Check if container already exists
if distrobox list | grep -q "$CONTAINER_NAME"; then
  echo "Container '$CONTAINER_NAME' already exists."
  read -p "Do you want to recreate it? (y/N) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    distrobox rm "$CONTAINER_NAME" -f
  else
    echo "Using existing container."
    distrobox enter "$CONTAINER_NAME"
    exit 0
  fi
fi

# Create the container first (without additional packages to avoid errors)
distrobox create \
  --name "$CONTAINER_NAME" \
  --image "$IMAGE" \
  --yes

echo ""
echo "Container created successfully!"
echo ""
echo "Installing system dependencies inside container..."

# Install packages inside the container separately
distrobox enter "$CONTAINER_NAME" -- bash -c "
  set -e
  sudo apt-get update
  sudo apt-get install -y curl wget git nodejs npm

  # Install Playwright browser dependencies
  sudo apt-get install -y \\
    libnss3 \\
    libnspr4 \\
    libatk1.0-0 \\
    libatk-bridge2.0-0 \\
    libcups2 \\
    libdrm2 \\
    libdbus-1-3 \\
    libxkbcommon0 \\
    libxcomposite1 \\
    libxdamage1 \\
    libxfixes3 \\
    libxrandr2 \\
    libgbm1 \\
    libasound2 \\
    libpango-1.0-0 \\
    libcairo2 \\
    libatspi2.0-0 \\
    libxshmfence1 \\
    libgtk-3-0
"

echo ""
echo "Installing Playwright browsers inside container..."

# Install Playwright and browsers inside the container
distrobox enter "$CONTAINER_NAME" -- bash -c "
  cd /tmp
  # Create a temp package.json just for installing playwright
  npm init -y
  npm install @playwright/test
  npx playwright install chromium
  npx playwright install-deps chromium
"

echo ""
echo "Setup complete! To use the container:"
echo ""
echo "  # Enter the container"
echo "  distrobox enter $CONTAINER_NAME"
echo ""
echo "  # Run Playwright tests"
echo "  npm run test:e2e"
echo ""
echo "Or use the convenience script:"
echo "  ./scripts/distrobox-test.sh"
