#!/bin/bash

set -e

DOCS_DIST_DIR="gh-pages"

echo "Begin to build docs..."
npm run docs:build -- -d $DOCS_DIST_DIR
echo "Generated successfully!"
