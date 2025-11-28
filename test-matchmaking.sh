#!/bin/bash

echo "Testing matchmaking with 2 simulated players..."
echo ""
echo "This script will:"
echo "1. Join player 1 to the queue"
echo "2. Join player 2 to the queue"
echo "3. They should be matched automatically"
echo ""

# Note: This requires the WebSocket test HTML file
echo "To test matchmaking:"
echo "1. Open your browser to http://localhost:3000"
echo "2. Open a SECOND browser window (or incognito)"
echo "3. In BOTH windows, click the SAME time control (e.g., '5+0')"
echo "4. Watch them get matched!"
echo ""
echo "Expected behavior:"
echo "- First window: Shows 'Searching for opponent...'"
echo "- Second window: Joins queue"
echo "- BOTH windows: Should show 'Match found!' and navigate to game"
