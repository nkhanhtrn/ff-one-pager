
#!/bin/bash
set -e

# Generate a coverage badge using shields.io and statements percentage
badge_pct=$(grep -A1 'Statements' coverage/index.html | grep strong | head -1 | sed -E 's/.*>([0-9.]+)%.*/\1/')
badge_pct=${badge_pct:-0}
badge_color=brightgreen
if echo "$badge_pct" | grep -Eq '^[0-9]+(\.[0-9]+)?$'; then
  if [ "$(echo "$badge_pct < 90" | bc)" -eq 1 ]; then badge_color=yellow; fi
  if [ "$(echo "$badge_pct < 75" | bc)" -eq 1 ]; then badge_color=red; fi
fi
badge_url="https://img.shields.io/badge/coverage-${badge_pct}%25-${badge_color}.svg"
badge_md="![Coverage]($badge_url)"

# Run test coverage before deploying
npm run test:coverage

# Build PWA
VITE_PWA=true vite build

# Move index.pwa.html to index.html for root access
cp dist/index.pwa.html dist/index.html




# Extract coverage summary from HTML and insert after the coverage report link
today=$(date +%F)
covfile=coverage/index.html
statements=$(grep -A1 'Statements' "$covfile" | grep strong | head -1 | sed -E 's/.*>([0-9.]+%)<.*/\1/')
statements_cov=$(grep -A2 'Statements' "$covfile" | grep fraction | head -1 | sed -E 's/.*>([0-9]+\/[0-9]+)<.*/\1/')
branches=$(grep -A1 'Branches' "$covfile" | grep strong | head -1 | sed -E 's/.*>([0-9.]+%)<.*/\1/')
branches_cov=$(grep -A2 'Branches' "$covfile" | grep fraction | head -1 | sed -E 's/.*>([0-9]+\/[0-9]+)<.*/\1/')
functions=$(grep -A1 'Functions' "$covfile" | grep strong | head -1 | sed -E 's/.*>([0-9.]+%)<.*/\1/')
functions_cov=$(grep -A2 'Functions' "$covfile" | grep fraction | head -1 | sed -E 's/.*>([0-9]+\/[0-9]+)<.*/\1/')
lines=$(grep -A1 'Lines' "$covfile" | grep strong | head -1 | sed -E 's/.*>([0-9.]+%)<.*/\1/')
lines_cov=$(grep -A2 'Lines' "$covfile" | grep fraction | head -1 | sed -E 's/.*>([0-9]+\/[0-9]+)<.*/\1/')
table="\n$badge_md\n\n## Coverage Summary ($today)\n\n| Metric     | Percent   | Covered / Total |\n|------------|-----------|-----------------|\n| Statements | $statements    | $statements_cov       |\n| Branches   | $branches    | $branches_cov         |\n| Functions  | $functions    | $functions_cov         |\n| Lines      | $lines    | $lines_cov       |\n\n> Detailed per-file and per-folder coverage is available in the full report above.\n"
# Remove any old summary and badge
sed -i '/^![Cc]overage/d' README-gh-pages.md
sed -i '/^## Coverage Summary/,/^> Detailed per-file and per-folder coverage is available in the full report above\./d' README-gh-pages.md
# Insert new badge and summary after the coverage report link
awk -v table="$table" '/coverage\/index.html/ {print; print table; next} 1' README-gh-pages.md > README-gh-pages.md.tmp && mv README-gh-pages.md.tmp README-gh-pages.md
# Copy README-gh-pages.md as README.md for GitHub Pages landing page
cp README-gh-pages.md dist/README.md

# Copy coverage folder into dist so it is deployed to GitHub Pages
cp -r coverage dist/

# Deploy to gh-pages branch using gh-pages package
npx gh-pages -d dist

echo "PWA deployed to GitHub Pages!"
