#!/usr/bin/env bash
# Adds a project checked out from its own repo to the built site, served at /<name>/.
# Usage: scripts/add-project.sh <name> <source-dir>
set -euo pipefail
name=$1
src=$2
out=dist/$name

if [ -f "$src/package.json" ]; then
  # project with its own Vite build
  (cd "$src" && npm ci && npm run build -- --base="/$name/")
  mkdir -p "$out"
  cp -r "$src/dist/." "$out/"
  exit 0
fi

page=
for f in "$src/$name.html" "$src/index.html"; do
  if [ -f "$f" ]; then page=$f; break; fi
done
if [ -z "$page" ]; then
  echo "::warning::$name has no package.json, $name.html or index.html yet; skipping it"
  exit 0
fi

# A page exported from a Claude artifact relies on the artifact viewer for its document
# header and for the hidden attribute winning over display rules; supply both here.
fix='<style>[hidden]{display:none!important}</style>'
mkdir -p "$out"
if grep -qi '<!doctype' "$page"; then
  sed "0,/<head[^>]*>/s//&\n$fix/I" "$page" > "$out/page.html"
else
  {
    printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n'
    printf '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">\n%s\n' "$fix"
    cat "$page"
  } > "$out/page.html"
fi

# minified so the source is less readable; it is still public once served
npx --yes html-minifier-terser@7.2.0 --collapse-whitespace --minify-js true --minify-css true \
  -o "$out/index.html" "$out/page.html"
rm "$out/page.html"
