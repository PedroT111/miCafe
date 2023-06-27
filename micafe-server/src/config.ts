import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE || '',
    DATABASE_NAME: process.env.DATABASE_NAME,
    JWT: process.env.JWT_SECRET || '',
    JWT_EXPIRE: process.env.JWT_EXPIRES_IN,
};


export default config;
