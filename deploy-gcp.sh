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

# Build and push Docker image using Cloud Build
echo "Building and pushing Docker image via Cloud Build..."
gcloud builds submit --tag ${IMAGE}:latest .

# Production database URL using Unix socket for Cloud SQL
PROD_DB_URL="mysql://root:d4taMa1n162738@localhost/cold-db-mysql?socketPath=/cloudsql/coldspace-leads:us-east1:cold-db-mysql"

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
    --add-cloudsql-instances=coldspace-leads:us-east1:cold-db-mysql \
    --remove-secrets=TURSO_AUTH_TOKEN \
    --update-env-vars DATABASE_URL="${PROD_DB_URL}"

echo ""
echo "=== Deployment Complete ==="
echo "Service URL:"
gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)'
