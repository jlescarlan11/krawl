# Getting Started with Krawl Development

> **Purpose:** Step-by-step tutorial to set up your local Krawl development environment and run the application for the first time.

**Time Required:** 30-45 minutes  
**Difficulty:** Beginner  
**Prerequisites:** Basic command line knowledge

---

## What You'll Learn

By the end of this tutorial, you will:
- ✅ Set up the complete Krawl development environment
- ✅ Run the backend API server
- ✅ Run the frontend PWA application
- ✅ Verify the database connection
- ✅ Make your first API request

---

## Before You Begin

### What You'll Need

Make sure you have these installed:

- **Git** - Version control ([Download](https://git-scm.com/))
- **Node.js 18+** - JavaScript runtime ([Download](https://nodejs.org/))
- **Java 17+** - Backend runtime ([Download](https://adoptium.net/))
- **Docker Desktop** - For PostgreSQL ([Download](https://www.docker.com/products/docker-desktop/))
- **Code Editor** - VS Code recommended ([Download](https://code.visualstudio.com/))

### Optional Tools

- **Postman** or **Insomnia** - For testing API endpoints
- **pgAdmin** or **DBeaver** - For viewing database

---

## Step 1: Clone the Repository

Open your terminal and clone the Krawl repository:

```bash
git clone https://github.com/your-org/krawl.git
cd krawl
```

**Expected output:**
```
Cloning into 'krawl'...
remote: Enumerating objects: 1234, done.
```

✅ **Checkpoint:** You should now have a `krawl` folder with `frontend/`, `backend/`, and `docs/` directories.

---

## Step 2: Start the Database

Navigate to the root directory and start PostgreSQL with PostGIS:

```bash
docker-compose up -d
```

**Expected output:**
```
Creating network "krawl_default" with the default driver
Creating krawl-postgres ... done
```

**Wait 10-15 seconds** for PostgreSQL to fully start.

### Verify Database is Running

```bash
docker ps
```

You should see a container named `krawl-postgres` with status `Up`.

### Test Database Connection

```bash
docker exec -it krawl-postgres psql -U krawl_user -d krawl_db
```

If successful, you'll see the PostgreSQL prompt:
```
krawl_db=#
```

Type `\q` to exit.

✅ **Checkpoint:** Database is running and accessible!

---

## Step 3: Set Up the Backend

### Navigate to Backend Directory

```bash
cd backend
```

### Install Dependencies

**Build the project:**
```bash
./mvnw clean install
```

**Expected output:**
```
BUILD SUCCESS
Total time: 45 s
```

### Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# backend/.env
DATABASE_URL=jdbc:postgresql://localhost:5432/krawl_db
DB_USERNAME=krawl_user
DB_PASSWORD=krawl_password
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
```

**⚠️ Important:** Never commit `.env` files to Git. They should already be in `.gitignore`.

### Run Database Migrations

Migrations will create all necessary tables:

```bash
./mvnw flyway:migrate
```

**Expected output:**
```
Successfully applied 1 migration to schema "public"
```

### Start the Backend Server

```bash
./mvnw spring-boot:run
```

**Expected output:**
```
Started KrawlApplication in 8.234 seconds (JVM running for 9.123)
```

The backend API is now running at `http://localhost:8080`!

✅ **Checkpoint:** Backend server is running.

**Keep this terminal open.** Open a new terminal tab for the next steps.

---

## Step 4: Set Up the Frontend

### Navigate to Frontend Directory

In a **new terminal tab**:

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

**Expected output:**
```
added 1234 packages in 45s
```

### Configure Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_MAPLIBRE_API_KEY=your-maptiler-api-key
```

**Note:** For local development, you can use a free Maptiler API key from [maptiler.com](https://www.maptiler.com/).

### Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

The frontend PWA is now running at `http://localhost:3000`!

✅ **Checkpoint:** Frontend is running and connected to backend.

---

## Step 5: Verify Everything Works

### Test the Backend API

Open a new terminal and test the health endpoint:

```bash
curl http://localhost:8080/api/v1/storage/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### Test the Frontend

1. Open your browser to `http://localhost:3000`
2. You should see the Krawl map view
3. The map should load (might show default location if no data yet)

✅ **Checkpoint:** Full stack is running!

---

## Step 6: Create Your First User

### Register a Test User

Open Postman (or use curl) and send a POST request:

**Endpoint:** `http://localhost:8080/api/v1/auth/register`  
**Method:** POST  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test1234"
}
```

**Expected response (201 Created):**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "testuser",
  "email": "test@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Save the token!** You'll need it for authenticated requests.

### Test Login

**Endpoint:** `http://localhost:8080/api/v1/auth/login`  
**Method:** POST  
**Body:**
```json
{
  "email": "test@example.com",
  "password": "Test1234"
}
```

You should get the same token back.

✅ **Checkpoint:** Authentication is working!

---

## Step 7: Create Your First Gem

Now let's create a Gem using the API:

**Endpoint:** `http://localhost:8080/api/v1/gems`  
**Method:** POST  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body:**
```json
{
  "name": "My First Gem",
  "description": "A test location for development",
  "latitude": 14.5547,
  "longitude": 121.0244,
  "tags": ["test", "development"]
}
```

**Expected response (201 Created):**
```json
{
  "gemId": "uuid-here",
  "name": "My First Gem",
  "latitude": 14.5547,
  "longitude": 121.0244,
  "founderId": "your-user-id",
  "founderUsername": "testuser",
  "vouchCount": 0,
  "averageRating": 0.00,
  "approvalStatus": "pending",
  "lifecycleStatus": "open",
  "createdAt": "2025-10-31T10:00:00Z"
}
```

### View Your Gem on the Map

1. Go to `http://localhost:3000`
2. Pan the map to Manila (lat: 14.5547, lng: 121.0244)
3. You should see your Gem marker!

✅ **Checkpoint:** You've created your first Gem!

---

## What You've Accomplished

Congratulations! 🎉 You now have:

- ✅ A fully functional local development environment
- ✅ Backend API running on port 8080
- ✅ Frontend PWA running on port 3000
- ✅ PostgreSQL database with PostGIS
- ✅ Your first registered user
- ✅ Your first Gem created and visible on the map

---

## Next Steps

### Continue Learning

Now that your environment is set up, try these tutorials:

1. **[Pin Your First Gem (Frontend)](./first-gem-tutorial.md)** - Use the UI to create a Gem
2. **[Create Your First Krawl](./create-first-krawl.md)** - Build a trail with multiple Gems

### Explore the Codebase

**Backend:**
- `backend/src/main/java/com/krawl/api/controllers/` - API endpoints
- `backend/src/main/java/com/krawl/api/services/` - Business logic
- `backend/src/main/resources/db/migration/` - Database migrations

**Frontend:**
- `frontend/src/app/` - Next.js pages and components
- `frontend/src/components/` - Reusable UI components
- `frontend/src/lib/` - Utilities and API clients

### Join the Team

- Read the [Contributing Guide](../planning/CONTRIBUTING.md) *(to be created)*
- Check [Open Issues](https://github.com/your-org/krawl/issues)
- Join the team Slack/Discord *(if applicable)*

---

## Troubleshooting

### Database Connection Fails

**Problem:** `Connection refused` or `could not connect to server`

**Solution:**
1. Check Docker is running: `docker ps`
2. Restart the database: `docker-compose restart`
3. Wait 10-15 seconds after starting
4. Verify port 5432 is not in use by another process

### Backend Won't Start

**Problem:** `Port 8080 is already in use`

**Solution:**
1. Stop any processes using port 8080
2. Or change the port in `application.yml`:
   ```yaml
   server:
     port: 8081
   ```
3. Update `NEXT_PUBLIC_API_URL` in frontend `.env.local`

### Frontend Shows "API Connection Error"

**Problem:** Frontend can't reach backend

**Solution:**
1. Verify backend is running: `curl http://localhost:8080/api/v1/storage/health`
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Restart frontend dev server: `npm run dev`

### Map Doesn't Load

**Problem:** Blank map or "Failed to load map style"

**Solution:**
1. Verify your Maptiler API key is valid
2. Check `NEXT_PUBLIC_MAPLIBRE_API_KEY` in `.env.local`
3. Get a free key at [maptiler.com](https://www.maptiler.com/)

### "JWT Secret" Error

**Problem:** Backend fails with JWT configuration error

**Solution:**
1. Ensure `JWT_SECRET` in `.env` is at least 32 characters
2. Generate a secure secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

---

## Useful Commands

### Backend

```bash
# Build project
./mvnw clean install

# Run tests
./mvnw test

# Start server
./mvnw spring-boot:run

# Run migrations
./mvnw flyway:migrate
```

### Frontend

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Database

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs -f postgres

# Access PostgreSQL shell
docker exec -it krawl-postgres psql -U krawl_user -d krawl_db
```

### Git

```bash
# Create feature branch
git checkout -b feature/my-feature

# Check status
git status

# Commit changes
git add .
git commit -m "feat: add my feature"

# Push to remote
git push origin feature/my-feature
```

---

## Additional Resources

- **[API Documentation](../reference/api-endpoints.md)** - Complete API reference
- **[Database Schema](../reference/database-schema.md)** - Database structure
- **[Design System](../reference/design-system.md)** - UI components and styling
- **[Security Guide](../how-to/implement-security.md)** - Security best practices
- **[Glossary](../reference/glossary.md)** - Technical terms and acronyms

---

## Need Help?

- 📖 Check the [FAQ](#) *(to be created)*
- 💬 Ask in team chat
- 🐛 Report bugs on [GitHub Issues](https://github.com/your-org/krawl/issues)
- 📧 Email the team lead

---

**You're all set!** Happy coding! 🚀

*Tutorial maintained by Development Team • Last updated: 2025-11-01*

