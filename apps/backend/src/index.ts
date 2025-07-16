import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { keyboardRoutes } from './routes/keyboards';
import { authRoutes } from './routes/auth';
import { errorHandler } from './middleware/errorHandler';
import { initializeDatabase } from './models';

dotenv.config();

const app = express();
const port = process.env['PORT'];

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env['CORS_ORIGIN'],
    credentials: true,
  })
);
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/keyboards', keyboardRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Only start the server if this file is run directly
if (require.main === module) {
  (async () => {
    try {
      await initializeDatabase();
      app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
        console.log(`📊 Health check: http://localhost:${port}/health`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  })();
}

export default app;
