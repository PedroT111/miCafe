import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config';
import {app, server} from './app';

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = config.DATABASE;
const port = config.PORT;

dotenv.config();
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((error: Error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
  
  server.listen(port, () => {
    console.log(`Socket.io is running on port ${port}...`);
    console.log(`API is running on port ${port}...`);
  });
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

