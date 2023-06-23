import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE || '',
};

export default config;
