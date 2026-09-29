import mongoose from 'mongoose';

/**
 * MongoDB connection manager with automated fallback.
 * If MONGO_URI is not provided or connection fails, the system
 * gracefully activates the in-memory data store so that receptionists
 * can continue their work without downtime.
 */

let isConnectedToMongoDB = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri || mongoUri.trim() === '') {
    console.log('\x1b[33m%s\x1b[0m', 'ℹ [Database] MONGO_URI not configured. Operating in In-Memory / Local Persistence mode.');
    isConnectedToMongoDB = false;
    return false;
  }

  try {
    console.log(`[Database] Attempting connection to MongoDB at ${mongoUri.replace(/:([^:@]{3,})@/, ':****@')}...`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnectedToMongoDB = true;
    console.log('\x1b[32m%s\x1b[0m', '✓ [Database] Connected successfully to live MongoDB instance.');
    return true;
  } catch (error) {
    console.warn('\x1b[33m%s\x1b[0m', `⚠ [Database] MongoDB connection unavailable (${error.message || 'offline'}).`);
    console.log('\x1b[36m%s\x1b[0m', 'ℹ [Database] Falling back to In-Memory store for all /api/visitors endpoints.');
    isConnectedToMongoDB = false;
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isConnectedToMongoDB,
  provider: isConnectedToMongoDB ? 'MongoDB (Mongoose)' : 'In-Memory Fallback Store',
});
