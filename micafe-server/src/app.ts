/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import categoryProductRoutes from './routes/categoryProductRoutes';
import productRoutes from './routes/productRoutes';
import comboRoutes from './routes/comboRoutes';
import offerRoutes from './routes/offerRoutes';
import AppError from './utils/appError';
import offerScheduler from './tasks/offerScheduler';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/authenticate', userRoutes);
app.use('/category-product', categoryProductRoutes);
app.use('/product', productRoutes);
app.use('/combo', comboRoutes);
app.use('/offer', offerRoutes);

offerScheduler();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  if (err instanceof AppError) {
    statusCode = err.statusCode || 500;
    message = err.message;
  }

  res.status(statusCode).json({
    error: message
  });
};

app.use(errorHandler);

export default app;
