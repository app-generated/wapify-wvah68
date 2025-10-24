import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasks.js';
import categoriesRoutes from './routes/categories.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/categories', categoriesRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ API server running on port ${PORT}`);
});
