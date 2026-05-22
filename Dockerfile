# Stage 1: Build the application
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all workspace packages
COPY lib ./lib
COPY artifacts ./artifacts
COPY scripts ./scripts
COPY tsconfig.base.json tsconfig.json ./

# Install dependencies
RUN pnpm install --ignore-scripts

# Build the application
ENV NODE_ENV=production
RUN pnpm run build

# Stage 2: Production runtime
FROM node:22-slim AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy all necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/artifacts/api-server ./artifacts/api-server
COPY --from=builder /app/artifacts/coldspace-solutions/dist/public ./artifacts/coldspace-solutions/dist/public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV DATABASE_URL=${DATABASE_URL}

# Expose port
EXPOSE 8080

# Run the server
WORKDIR /app/artifacts/api-server
CMD ["node", "dist/index.js"]
