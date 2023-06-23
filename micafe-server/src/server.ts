import mongoose from "mongoose";
import dotenv from 'dotenv';
import config from "./config";
import app from './app';

process.on('uncaughtException', (err: Error) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config();
const DB = config.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

const port = config.PORT;
const server = app.listen(port, () => {
  console.log(`API is running on port ${port}...`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

