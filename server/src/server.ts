import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import userHotelsRoutes from './routes/my-hotels.route';
import hotelsRoutes from './routes/hotels.routes';
import cookieParser from 'cookie-parser';

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use('/api/users', authRoutes);
app.use('/api/my-hotels', userHotelsRoutes);
app.use('/api/hotels', hotelsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
