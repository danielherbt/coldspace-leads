#!/bin/bash
# Script para empaquetar archivos para Mochahost
echo "Iniciando empaquetado para MochaHost..."

# 1. Crear carpeta temporal
mkdir -p mocha_deploy/public_html
mkdir -p mocha_deploy/coldspace_api

# 2. Copiar archivos del Frontend (Vite)
echo "Copiando frontend..."
cp -r artifacts/coldspace-solutions/dist/public/* mocha_deploy/public_html/ 2>/dev/null || echo "Asegúrate de ejecutar pnpm run build primero"

# 3. Copiar archivos del Backend (API)
echo "Copiando backend..."
cp artifacts/api-server/dist/index.cjs mocha_deploy/coldspace_api/ 2>/dev/null
# Se usa el archivo .env de ejemplo como base para el entorno de prod (el usuario lo editará en cpanel)
cp .env mocha_deploy/coldspace_api/ 2>/dev/null

# 4. Crear ZIP
echo "Creando archivo .zip..."
cd mocha_deploy
zip -r ../deploy_mochahost.zip ./*
cd ..

# 5. Limpiar
rm -rf mocha_deploy

echo "¡Empaquetado completado! Sube 'deploy_mochahost.zip' a MochaHost."
