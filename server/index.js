import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'TrafficFlow AI Backend Engine', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 TrafficFlow AI Express Server listening on http://localhost:${PORT}`);
});
