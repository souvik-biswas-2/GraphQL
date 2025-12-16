# MongoDB Docker Cluster Setup

## Overview
This Docker Compose configuration sets up a MongoDB replica set cluster with 3 nodes for your GraphQL backend.

## ✅ Status
Your MongoDB cluster is now **running and fully operational**!

## Requirements
- Docker Desktop installed
- Docker Compose installed

## Quick Start

### 1. Start the MongoDB Cluster
From the root directory of the project, run:

```bash
docker-compose up -d
```

This will start 3 MongoDB containers:
- **mongo1**: Port 27017 (PRIMARY)
- **mongo2**: Port 27018 (SECONDARY)
- **mongo3**: Port 27019 (SECONDARY)

The replica set will be initialized automatically via the `mongo-init` service.

### 2. MongoDB Connection
The MONGO_URI is already configured in `backend/.env`:
```
mongodb://localhost:27017,localhost:27018,localhost:27019/graphql?replicaSet=rs0
```

### 3. Verify Cluster Status
Check if all containers are running:

```bash
docker-compose ps
```

Check replica set status:

```bash
docker exec mongo1 mongosh --eval "rs.status()"
```

### 4. Run Your Backend
Start your Node.js backend:

```bash
cd backend
npm run dev
```

The backend will automatically connect to the MongoDB cluster using the MONGO_URI from the `.env` file.

## Stopping the Cluster

```bash
docker-compose down
```

To remove all volumes (data will be deleted):

```bash
docker-compose down -v
```

## Useful MongoDB Commands

### Access MongoDB Shell
```bash
docker exec -it mongo1 mongosh
```

### View Replica Set Members
```bash
docker exec mongo1 mongosh --eval "rs.members()"
```

### Check Current Primary
```bash
docker exec mongo1 mongosh --eval "db.isMaster()"
```

### View All Databases
```bash
docker exec mongo1 mongosh --eval "show dbs"
```

## Architecture

- **3-Node Replica Set**: Ensures high availability and data redundancy
- **Named Volumes**: Persistent data storage across container restarts
- **Custom Network**: Containers communicate via named bridge network
- **Health Checks**: Automatic monitoring of container health

## Troubleshooting

### Containers won't start
- Check if ports 27017, 27018, 27019 are already in use
- Run `docker-compose down -v` and try again

### Connection timeout
- Ensure all containers are running: `docker-compose ps`
- Wait a few seconds for containers to initialize before connecting

### Cannot connect from backend
- Verify `MONGO_URI` in `.env` is correct
- Ensure backend container can reach MongoDB containers (same network)
- Check MongoDB logs: `docker-compose logs mongo1`

## Environment Variables

Update `backend/.env` if needed:
```env
MONGO_URI=mongodb://localhost:27017,localhost:27018,localhost:27019/graphql?replicaSet=rs0
PORT=5050
NODE_ENV=development
```

## Files
- `docker-compose.yml` - Main Docker Compose configuration
- `mongo-keyfile` - (Reserved for future authentication setup)
- `init-mongo.js` - (Reserved for initialization scripts)
