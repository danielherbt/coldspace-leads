#!/bin/bash

echo "Starting API Server on port 3000..."
PORT=3000 pnpm -C artifacts/api-server dev > api.log 2>&1 &

echo "Starting Coldspace Solutions on port 5173..."
PORT=5173 BASE_PATH=/ pnpm -C artifacts/coldspace-solutions dev > frontend.log 2>&1 &

echo "Starting Mockup Sandbox on port 5174..."
PORT=5174 BASE_PATH=/ pnpm -C artifacts/mockup-sandbox dev > sandbox.log 2>&1 &

echo "All services started in the background. Check api.log, frontend.log, and sandbox.log for output."
