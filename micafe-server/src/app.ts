/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import http from 'http';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import categoryProductRoutes from './routes/categoryProductRoutes';
import productRoutes from './routes/productRoutes';
import comboRoutes from './routes/comboRoutes';
import offerRoutes from './routes/offerRoutes';
import orderRoutes from './routes/orderRoutes';
import discountRoutes from './routes/discountRoutes';
import employeeRoutes from './routes/employeeRoutes';
import reportRoutes from './routes/reportRoutes';
import supplierRoutes from './routes/supplierRoutes';
import AppError from './utils/appError';
import offerScheduler from './tasks/offerScheduler';
import discountScheduler from './tasks/discountScheduler';
import {initializeSocket} from './sockets';

const app = express();
app.use(cors({
  origin: 'https://65d8f9e64e62425195b34b7f--comforting-nougat-4223c6.netlify.app',
  credentials: true // Habilitar credenciales si tu aplicación las necesita (por ejemplo, cookies)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
initializeSocket(server);


app.use('/authenticate', authRoutes);
app.use('/user', userRoutes);
app.use('/category-product', categoryProductRoutes);
app.use('/product', productRoutes);
app.use('/combo', comboRoutes);
app.use('/offer', offerRoutes);
app.use('/orders', orderRoutes);
app.use('/discount', discountRoutes);
app.use('/employee', employeeRoutes);
app.use('/report', reportRoutes);
app.use('/supplier', supplierRoutes)
offerScheduler();
discountScheduler();

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

export { app, server };
