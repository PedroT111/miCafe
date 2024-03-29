import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT ?? 2039,
  DATABASE: process.env.DATABASE ?? '',
  DATABASE_NAME: process.env.DATABASE_NAME,
  JWT: process.env.JWT_SECRET ?? '',
  JWT_EXPIRE: process.env.JWT_EXPIRES_IN,
  SENDGRID_API: process.env.SENDGRID_API ?? '',
  EMAIL_SENDGRID: process.env.EMAIL ?? '',
  URL: process.env.URL
};

export default config;
