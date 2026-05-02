#!/bin/bash

set -e

# Configuration
PROJECT_ID="${GCP_PROJECT_ID:-coldspace-leads}"
REGION="${GCP_REGION:-us-central1}"
SERVICE_NAME="coldspace-leads"
IMAGE="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "=== Google Cloud Run Deployment Script ==="
echo "Project: ${PROJECT_ID}"
echo "Region: ${REGION}"
echo "Service: ${SERVICE_NAME}"
echo ""

# Check if gcloud is installed and authenticated
if ! command -v gcloud &> /dev/null; then
    echo "Error: gcloud CLI is not installed"
    echo "Install: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Build and push Docker image
echo "Building Docker image..."
#docker build -t ${IMAGE}:latest .
podman build -t ${IMAGE}:latest .

echo "Pushing Docker image to GCR..."
podman push ${IMAGE}:latest

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE}:latest \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --concurrency 80 \
    --timeout 60s \
    --set-env-vars TURSO_DATABASE_URL=libsql://coldspace-leads-danielherbt.aws-us-west-2.turso.io \
    --set-secrets TURSO_AUTH_TOKEN=TURSO_AUTH_TOKEN:latest

echo ""
echo "=== Deployment Complete ==="
echo "Service URL:"
gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)'
