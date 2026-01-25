#!/bin/bash
# Convenience script to run Playwright tests inside distrobox

CONTAINER_NAME="one-pager-e2e"

# Check if container exists
if ! distrobox list | grep -q "$CONTAINER_NAME"; then
  echo "Container '$CONTAINER_NAME' not found."
  echo "Run ./scripts/distrobox-setup.sh first to create it."
  exit 1
fi

# Run the given command inside the container
# If no arguments, run all E2E tests
if [ $# -eq 0 ]; then
  COMMAND="npm run test:e2e"
else
  COMMAND="$@"
fi

echo "Running inside distrobox: $COMMAND"
distrobox enter "$CONTAINER_NAME" -- bash -c "cd $(pwd) && $COMMAND"
