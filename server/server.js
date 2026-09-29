import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

async function startServer() {
  const app = createApp();

  // Connect to Database or initialize in-memory fallback
  await connectDB();

  // If in production mode and serving static client
  if (process.env.NODE_ENV === 'production') {
    const clientDist = path.resolve(__dirname, '../../dist');
    const express = await import('express');
    app.use(express.default.static(clientDist));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(clientDist, 'index.html'));
    });
  }

  // Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`[Front Desk Server] Running on http://localhost:${PORT}`);
  });
}

// Only auto-start when executed directly
if (process.argv[1] && (process.argv[1].endsWith('server.js') || process.argv[1].endsWith('server.ts'))) {
  startServer();
}

export { startServer };
