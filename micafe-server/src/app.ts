import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import categoryProductRoutes from './routes/categoryProductRoutes';
import productRoutes from './routes/productRoutes';
import comboRoutes from './routes/comboRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/authenticate', userRoutes);
app.use('/category-product', categoryProductRoutes);
app.use('/product', productRoutes);
app.use('/combo', comboRoutes);
export default app;
