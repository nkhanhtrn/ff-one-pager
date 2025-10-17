#!/bin/bash
# Deploy Vite build output to GitHub Pages (gh-pages branch)

set -e

# Build the project
npm run build

# Check if gh-pages branch exists
if git show-ref --quiet refs/heads/gh-pages; then
  git branch -D gh-pages
fi

git checkout --orphan gh-pages

# Remove all tracked files except dist and .git (safe)
git rm -rf --cached .
find . -maxdepth 1 ! -name 'dist' ! -name '.' ! -name '..' ! -name '.git' -exec rm -rf {} +

# Move build output to root
cp -r dist/* .
rm -rf dist

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

git push -f origin gh-pages

git checkout master

echo "Deployment complete. Enable GitHub Pages for the gh-pages branch in your repo settings."
