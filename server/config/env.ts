import dotenv from 'dotenv';
dotenv.config();

const required = [
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'DB_HOST',
  'DB_PORT',
  'CLIENT_URL',
  'PORT',
] as const;

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const DB_NAME = process.env.DB_NAME!;
export const DB_USER = process.env.DB_USER!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const DB_HOST = process.env.DB_HOST!;
export const DB_PORT = parseInt(process.env.DB_PORT!, 10);
export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;
