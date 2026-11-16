import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes (placeholder)
app.post('/api/auth/login', (req: Request, res: Response) => {
  res.json({ message: 'Login endpoint - to implement with NextAuth' });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logout endpoint' });
});

// Projects routes (placeholder)
app.get('/api/projects', (req: Request, res: Response) => {
  res.json({ message: 'Get projects - requires auth' });
});

app.post('/api/projects', (req: Request, res: Response) => {
  res.json({ message: 'Create project - requires auth' });
});

// Datasets routes (placeholder)
app.post('/api/datasets/:projectId', (req: Request, res: Response) => {
  res.json({ message: 'Upload dataset - requires auth' });
});

app.get('/api/datasets/:projectId', (req: Request, res: Response) => {
  res.json({ message: 'Get datasets for project' });
});

// Error handler
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ResearchOS API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
