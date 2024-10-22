import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import connectMongoDB from './db/connectMongoDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
  connectMongoDB();
});
