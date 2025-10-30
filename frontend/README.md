# Krawl Frontend

A Next.js frontend application for Krawl - a community-driven platform for discovering authentic Filipino culture through location-based exploration.

## Features

- **Offline-First Architecture**: Uses IndexedDB for local data storage and sync queue management
- **PWA Support**: Progressive Web App with service worker for offline functionality
- **Real-time Map Integration**: MapLibre GL map with offline tile caching
- **API Versioning**: Supports versioned API endpoints (`/api/v1`)
- **Type Safety**: Full TypeScript support with strict mode enabled

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Maps**: MapLibre GL, Leaflet (with marker clustering)
- **State Management**: React hooks + IndexedDB for persistence
- **Notifications**: Sonner (toast notifications)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp env-example.txt .env.local
   
   # Edit .env.local and fill in your values:
   # - NEXT_PUBLIC_API_URL: Your backend API base URL (e.g., http://localhost:8080)
   # - NEXT_PUBLIC_MAPTILER_API_KEY: Your MapTiler API key
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Architecture

### Directory Structure

```
frontend/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── map/         # Map-related components
│   └── ...
├── lib/             # Business logic and utilities
│   ├── api/         # API client and offline-first utilities
│   ├── config/      # Configuration management
│   ├── constants/   # Application constants
│   ├── db/          # IndexedDB stores and sync logic
│   ├── errors/      # Error handling classes
│   ├── hooks/       # Custom React hooks
│   ├── map/         # Map utilities and hooks
│   └── utils/       # Utility functions
└── public/          # Static assets
```

### Key Concepts

#### Offline-First Strategy

The app uses an offline-first approach:
1. Data is cached locally using IndexedDB
2. API calls return cached data immediately if available
3. Fresh data is fetched in the background and updates cache
4. On network errors, the app falls back to cached data
5. Mutations are queued for sync when offline

#### API Configuration

API configuration is centralized in `lib/config/env.ts`:
- Base URL and version are configurable
- API versioning is explicit (`/api/v1`)
- Easy to switch versions as backend evolves

#### Error Handling

Custom `ApiError` class provides:
- Typed error responses with status codes
- Detailed error messages from API
- Network error detection and handling

## Development

### Type Checking

Run TypeScript type checking without building:
```bash
npm run type-check
```

### Code Style

The project uses ESLint with Next.js configuration. Run linting:
```bash
npm run lint
```

### Environment Variables

All environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser. See `env-example.txt` for required variables.

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

Ensure all required environment variables are set in your production environment:
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `NEXT_PUBLIC_MAPTILER_API_KEY` - MapTiler API key

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MapLibre GL Documentation](https://maplibre.org/maplibre-gl-js-docs/)
