# Docker Deployment Guide

## Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+

## Running the Application

### 1. **Setup Environment Variables**
Copy `.env.example` to `.env` and adjust if needed:
```bash
cp .env.example .env
```

### 2. **Build and Run with Docker Compose**
```bash
docker-compose up --build
```

This will:
- Build the Next.js app image
- Start PostgreSQL database
- Start the Next.js app
- Expose the app on `http://localhost:3000`

### 3. **Run Prisma Migrations (if needed)**
If you need to run migrations on first launch:
```bash
docker-compose exec app npx prisma migrate deploy
```

## Configuration

### Environment Variables (via `.env`)
- `DB_USER`: PostgreSQL username (default: `admin`)
- `DB_PASSWORD`: PostgreSQL password (default: `root`)
- `DB_NAME`: PostgreSQL database name (default: `test_db`)
- `APP_PORT`: Port to expose the app (default: `3000`)

### Network
- **Internal Network**: `app-network` (bridge)
  - `app` service connects to `postgres:5432`
  - PostgreSQL is not exposed to the host machine
  - Only the app port (3000) is accessible from outside

## Useful Commands

### View Logs
```bash
docker-compose logs -f app
docker-compose logs -f postgres
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes (clean slate)
```bash
docker-compose down -v
```

### Rebuild After Code Changes
```bash
docker-compose up --build
```

### Run a Command in the App Container
```bash
docker-compose exec app npm run <command>
```

## Container Details

### PostgreSQL
- **Image**: `postgres:15-alpine`
- **Container Name**: `postgres-db`
- **Port**: `5432` (internal only, not exposed)
- **Health Check**: Every 10 seconds
- **Data Persistence**: Volume `postgres-data`

### Next.js App
- **Build**: Multi-stage Docker build from source
- **Container Name**: `job-tracker-app`
- **Port**: `3000` (exposed to host)
- **Depends On**: PostgreSQL (waits for health check)
- **Database Connection**: Automatic via `DATABASE_URL` env var

## Deployment

The entire setup is containerized and can be deployed anywhere:

1. **Push to Docker Registry** (optional):
   ```bash
   docker-compose build
   docker tag job-tracker-app:latest <registry>/job-tracker-app:latest
   docker push <registry>/job-tracker-app:latest
   ```

2. **Deploy on Any Server**:
   - Copy `docker-compose.yaml`, `.env` (or `.env.example`), and `Dockerfile`
   - Run `docker-compose up -d` on the target machine
   - App will be available on port 3000

## Troubleshooting

### App won't connect to database
- Ensure PostgreSQL is healthy: `docker-compose ps`
- Check app logs: `docker-compose logs app`
- Verify `DATABASE_URL` is set correctly in docker-compose.yaml

### Port 3000 already in use
- Change `APP_PORT` in `.env`:
  ```
  APP_PORT=8000
  ```
- Then access app at `http://localhost:8000`

### Rebuild from scratch
```bash
docker-compose down -v
docker-compose up --build
```
