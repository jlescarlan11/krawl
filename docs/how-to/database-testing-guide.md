# 🧪 Database Testing Guide

This guide provides step-by-step instructions for testing the PostgreSQL database with PostGIS extension.

---

## ✅ Prerequisites

- Docker and Docker Compose installed
- `.env` file configured (see [Project Setup](project-setup.md))
- Database container running (`docker-compose up -d`)

---

## 🔍 Test 1: Verify Container is Running

Check if the PostgreSQL container is running:

```bash
docker ps
```

**Expected Output:**
You should see a container named `krawl-db` with status `Up`.

```
CONTAINER ID   IMAGE                      COMMAND                  CREATED         STATUS                   PORTS                    NAMES
xxxxxxxxxxxxx  postgis/postgis:15-3.3     "docker-entrypoint.s…"   X minutes ago   Up X minutes (healthy)   0.0.0.0:5434->5432/tcp   krawl-db
```

**Check Container Logs:**

```bash
docker logs krawl-db
```

Look for messages indicating successful initialization and PostGIS extension creation.

---

## 🔍 Test 2: Test Database Connection

### Using Docker Exec (psql)

Connect to the database using psql inside the container:

```bash
docker exec -it krawl-db psql -U krawl_user -d krawl
```

Once connected, you should see the PostgreSQL prompt:
```
psql (15.x)
Type "help" for help.

krawl=#
```

**Run Basic Query:**
```sql
SELECT version();
```

**Exit psql:**
```
\q
```

### Using psql from Host Machine

If you have PostgreSQL client tools installed locally:

```bash
psql -h localhost -p 5432 -U krawl_user -d krawl
```

**Password:** `krawl_dev_password_2025` (or your configured password from `.env`)

---

## 🔍 Test 3: Verify PostGIS Extension

Connect to the database and run the following queries:

### Check PostGIS Version

```sql
SELECT PostGIS_version();
```

**Expected Output:**
```
           postgis_version
-----------------------------------------
 3.4 USE_GEOS=1 USE_PROJ=1 USE_STATS=1
(1 row)
```

### Check Installed Extensions

```sql
SELECT extname, extversion FROM pg_extension;
```

**Expected Output:**
```
      extname      | extversion
-------------------+------------
 plpgsql           | 1.0
 postgis           | 3.4.x
 postgis_topology  | 3.4.x
(3 rows)
```

### Test Spatial Functions

```sql
-- Create a test point
SELECT ST_AsText(ST_SetSRID(ST_MakePoint(-122.4194, 37.7749), 4326)) AS test_point;
```

**Expected Output:**
```
          test_point
-------------------------------
 POINT(-122.4194 37.7749)
(1 row)
```

---

## 🔍 Test 4: Test with Database GUI Client

### Using DBeaver (Recommended)

1. **Download and Install DBeaver:**
   - [Download DBeaver Community Edition](https://dbeaver.io/download/)

2. **Create New Connection:**
   - Click "New Database Connection"
   - Select "PostgreSQL"
   - Enter connection details:
     - Host: `localhost`
     - Port: `5432`
     - Database: `krawl`
     - Username: `krawl_user`
     - Password: `krawl_dev_password_2025`

3. **Test Connection:**
   - Click "Test Connection"
   - Should show "Connected" with PostgreSQL version info

4. **Verify PostGIS:**
   - Open SQL Editor
   - Run: `SELECT PostGIS_version();`

### Using pgAdmin

1. **Download and Install pgAdmin:**
   - [Download pgAdmin](https://www.pgadmin.org/download/)

2. **Add Server:**
   - Right-click "Servers" → "Register" → "Server"
   - General tab: Name = "Krawl Local"
   - Connection tab:
     - Host: `localhost`
     - Port: `5432`
     - Maintenance database: `krawl`
     - Username: `krawl_user`
     - Password: `krawl_dev_password_2025`

3. **Verify Connection:**
   - Expand "Servers" → "Krawl Local" → "Databases" → "krawl"
   - Open Query Tool
   - Run: `SELECT PostGIS_version();`

### Using TablePlus

1. **Download and Install TablePlus:**
   - [Download TablePlus](https://tableplus.com/)

2. **Create Connection:**
   - Click "Create a new connection"
   - Select "PostgreSQL"
   - Enter details:
     - Name: `Krawl Local`
     - Host: `localhost`
     - Port: `5432`
     - User: `krawl_user`
     - Password: `krawl_dev_password_2025`
     - Database: `krawl`

3. **Test Connection:**
   - Click "Test" button
   - Click "Connect"

---

## 🔍 Test 5: Verify Test Data

The initialization script creates a test table. Verify it exists:

```sql
-- Check if test_locations table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name = 'test_locations';
```

**Query Test Data:**

```sql
SELECT 
    id, 
    name, 
    ST_AsText(location) as location_wkt,
    ST_X(location) as longitude,
    ST_Y(location) as latitude,
    created_at
FROM test_locations;
```

**Expected Output:**
```
 id |     name      |        location_wkt         | longitude | latitude  |     created_at
----+---------------+-----------------------------+-----------+-----------+--------------------
  1 | Test Location | POINT(-122.4194 37.7749)    | -122.4194 | 37.7749   | 2025-10-28 ...
(1 row)
```

---

## 🔍 Test 6: Test Spatial Query

Run a spatial distance query:

```sql
-- Calculate distance between two points (in meters)
SELECT ST_Distance(
    ST_SetSRID(ST_MakePoint(-122.4194, 37.7749), 4326)::geography,  -- San Francisco
    ST_SetSRID(ST_MakePoint(-118.2437, 34.0522), 4326)::geography   -- Los Angeles
) / 1000 AS distance_km;
```

**Expected Output:**
```
    distance_km
-------------------
 559.119584...
(1 row)
```

This confirms that PostGIS spatial calculations are working correctly.

---

## 🔍 Test 7: Health Check

Check the container health status:

```bash
docker inspect krawl-db --format='{{.State.Health.Status}}'
```

**Expected Output:**
```
healthy
```

**View Health Check Logs:**

```bash
docker inspect krawl-db --format='{{json .State.Health}}' | python -m json.tool
```

---

## 🛠️ Troubleshooting

### Container Won't Start

**Check logs:**
```bash
docker logs krawl-db
```

**Common Issues:**
- Port 5432 already in use
- Invalid environment variables in `.env`
- Insufficient permissions

**Solution:**
```bash
# Stop the container
docker-compose down

# Remove volumes (WARNING: This deletes all data)
docker-compose down -v

# Restart
docker-compose up -d
```

### Cannot Connect to Database

**Verify container is running:**
```bash
docker ps
```

**Check port binding:**
```bash
netstat -an | grep 5432
# or on Windows:
netstat -an | findstr 5432
```

**Check environment variables:**
```bash
docker exec krawl-db env | grep POSTGRES
```

### PostGIS Extension Not Found

**Verify image:**
```bash
docker images | grep postgis
```

Should show `postgis/postgis:15-3.4`.

**Check init scripts:**
```bash
docker exec krawl-db ls /docker-entrypoint-initdb.d/
```

Should list your init scripts.

### Connection Refused

**Check if container is healthy:**
```bash
docker ps
```

Look for `(healthy)` status.

**Wait for container to be ready:**
The container might still be initializing. Wait 30-60 seconds after starting.

### Password Authentication Failed

**Verify credentials in `.env` file:**
```bash
cat .env
```

**Check what environment variables the container is using:**
```bash
docker exec krawl-db printenv | grep DB
```

---

## 📋 Complete Test Checklist

Use this checklist to verify all aspects of the database setup:

- [ ] Container starts successfully (`docker-compose up -d`)
- [ ] Container shows as healthy (`docker ps`)
- [ ] Can connect via psql from container (`docker exec -it krawl-db psql -U krawl_user -d krawl`)
- [ ] Can connect via psql from host (if PostgreSQL client installed)
- [ ] Can connect via GUI client (DBeaver/pgAdmin/TablePlus)
- [ ] PostGIS extension is installed (`SELECT PostGIS_version();`)
- [ ] PostGIS topology extension is installed
- [ ] Test table `test_locations` exists
- [ ] Test data is present in `test_locations`
- [ ] Spatial queries work correctly
- [ ] Container health check passes

---

## 🚀 Quick Test Script

Run this complete test in one command:

```bash
docker exec -it krawl-db psql -U krawl_user -d krawl -c "
SELECT 'Database: ' || current_database() as info
UNION ALL
SELECT 'User: ' || current_user
UNION ALL
SELECT 'PostGIS: ' || PostGIS_version()
UNION ALL
SELECT 'Tables: ' || count(*)::text FROM information_schema.tables WHERE table_schema = 'public';
"
```

**Expected Output:**
```
              info
----------------------------------
 Database: krawl
 User: krawl_user
 PostGIS: 3.4 USE_GEOS=1...
 Tables: 1
(4 rows)
```

---

## 📚 Next Steps

Once all tests pass:

1. Review [Database Schema](database-schema.md) for planned table structures
2. Set up database migrations (Flyway/Liquibase)
3. Configure backend Spring Boot application to connect to database
4. Implement initial data models and repositories

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-28 | Initial database testing guide | Backend Team |

---

## 📚 Related Documents

- [Database Schema](./database-schema.md) - Complete schema documentation
- [Project Setup](./project-setup.md) - Development environment setup
- [Architecture Overview](./explanation/architecture-overview.md) - System architecture
- [Design Patterns](./explanation/design-patterns.md) - Design patterns
- [Testing Plan](./testing-plan.md) - Overall testing strategy
- [API Documentation](./api-documentation.md) - API endpoints

---

*Document maintained by Backend Team • Last reviewed: 2025-10-28*

