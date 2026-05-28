import express, {} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from '../routes/index.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Learning Inventory API is running' });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map