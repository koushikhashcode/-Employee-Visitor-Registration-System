import express, { Application } from 'express';
import cors from 'cors';
import visitorRoutes from './routes/visitorRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { getDBStatus } from './config/db.js';

export const createApp = (): Application => {
  const app: Application = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Status & Health Check
  app.get('/api/health', (_req, res) => {
    const dbStatus = getDBStatus();
    res.status(200).json({
      status: 'operational',
      timestamp: new Date().toISOString(),
      service: 'Front Desk Visitor System API',
      database: dbStatus,
    });
  });

  // Visitor API Endpoints
  app.use('/api/visitors', visitorRoutes);

  return app;
};
