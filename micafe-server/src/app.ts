import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import categoryProductRoutes from './routes/categoryProductRoutes';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/authenticate', userRoutes);
app.use('/category-product',categoryProductRoutes);
export default app;
