// Configuration management for environment variables and API settings

export const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    version: 'v1',
    getBasePath: () => `${config.api.baseURL}/api/${config.api.version}`,
  },
  map: {
    apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY || '',
  },
} as const;

