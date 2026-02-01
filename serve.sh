#!/bin/bash

# Levython Documentation Server
# Simple script to serve the documentation locally

PORT=8000
DOCS_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 Starting Levython Documentation Server..."
echo "📁 Serving from: $DOCS_DIR"
echo "🌐 URL: http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try different server options
if command -v python3 &> /dev/null; then
    echo "Using Python 3..."
    cd "$DOCS_DIR"
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "Using Python..."
    cd "$DOCS_DIR"
    python -m SimpleHTTPServer $PORT
elif command -v php &> /dev/null; then
    echo "Using PHP..."
    cd "$DOCS_DIR"
    php -S localhost:$PORT
else
    echo "❌ Error: No suitable server found!"
    echo "Please install Python 3 or PHP to run the documentation server."
    echo ""
    echo "Alternatively, open index.html directly in your browser:"
    echo "  open $DOCS_DIR/index.html"
    exit 1
fi
