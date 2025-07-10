import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { keyboardRoutes } from './routes/keyboards';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env['PORT'] || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env['CORS_ORIGIN'] || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/keyboards', keyboardRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`⌨️  Keyboards API: http://localhost:${port}/api/keyboards`);
});

export default app;
