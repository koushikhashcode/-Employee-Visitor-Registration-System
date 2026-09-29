import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    const app = createApp();

    // Connect to database or initialize in-memory fallback
    await connectDB();

    // Serve frontend in production
    if (process.env.NODE_ENV === 'production') {
      const clientDist = path.resolve(__dirname, '../client/dist');

      console.log(`[Front Desk Server] Serving client from: ${clientDist}`);

      // Static frontend files
      app.use(express.static(clientDist));

      // SPA fallback
      app.get('*', (_req, res) => {
        res.sendFile(path.join(clientDist, 'index.html'));
      });
    }

    // Error handlers must come last
    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(
        `[Front Desk Server] Running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error('[Front Desk Server] Failed to start:', error);
    process.exit(1);
  }
}

// Only auto-start when executed directly
const isDirectExecution =
  process.argv[1] &&
  (process.argv[1].endsWith('server.js') ||
    process.argv[1].endsWith('server.ts'));

if (isDirectExecution) {
  startServer();
}

export { startServer };