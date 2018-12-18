#!/bin/bash

set -e

DOCS_DIST_DIR="gh-pages"
JS_DIST_DIR="dist"
DOCS_STATIC_DIR="docs/.vuepress/public/static"
PKG_NAME="kiss-vuex"

DOCS_STATIC_JS_DIR="$DOCS_STATIC_DIR/$JS_DIST_DIR"
FILES_WILL_COPY=("$PKG_NAME.js","$PKG_NAME.min.js","$PKG_NAME.js.map","$PKG_NAME.min.js.map")

{
    echo "Begin to copy distributed files to $DOCS_STATIC_JS_DIR"
    mkdir -m 777 -p $DOCS_STATIC_JS_DIR
    cp -R $JS_DIST_DIR/* $DOCS_STATIC_JS_DIR
    echo "Copied successfully!"
} || {
    echo "Failed to copy generated js files."
}

echo "Begin to build docs..."
npm run docs:build -- -d $DOCS_DIST_DIR
echo "Generated successfully!"