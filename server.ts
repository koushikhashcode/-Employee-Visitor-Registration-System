import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApp } from './server/app.js';
import { connectDB } from './server/config/db.js';
import { errorHandler } from './server/middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  const app = createApp();

  // Initialize database connection or activate in-memory fallback store
  await connectDB();

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Dev mode with Vite middlewares
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve dist assets
    const express = await import('express');
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.default.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  // Centralized Error Handler
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Front Desk System] Service ready at http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('[Front Desk] Startup failure:', err);
  process.exit(1);
});
