import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from '../routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Learning Inventory API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      products: '/api/v1/products',
      health: '/health'
    }
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Learning Inventory API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
