#!/bin/bash

# Sync shared folder script
# This ensures shared types are up to date

SHARED_DIR="../../shared"
TARGET_DIR="src/shared"

echo "🔄 Syncing shared types..."

# Remove if it's a directory or broken link
rm -rf "$TARGET_DIR"

echo "📦 Creating symlink to shared folder..."
ln -sf "$SHARED_DIR" "$TARGET_DIR"

if [ -e "$TARGET_DIR" ]; then
  echo "✅ Shared folder is linked correctly"
  ls -la "$TARGET_DIR"
else
  echo "❌ Failed to link shared folder"
  exit 1
fi

echo "✅ Shared types synced successfully!"
