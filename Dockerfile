# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src
COPY public ./public
COPY tsconfig.json next.config.mjs postcss.config.mjs ./

# Build the Next.js app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma

# Copy all node_modules from builder (needed for prisma CLI)
COPY --from=builder /app/node_modules ./node_modules

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Run migrations and start app - continue on error to prevent container from crashing
CMD ["sh", "-c", "npx prisma migrate deploy || true && npm start"]
