console.log('Trying to import from:', new URL('../middleware/validation.js', import.meta.url).pathname);
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db.js';
import weaponsRouter from './routes/weapons.js';
import authRouter from './routes/auth.js';
import setupSwagger from './swagger.js';
import models from './models/index.js';
import Weapon from './models/Weapon.js';
import os from 'os';

// Инициализация
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// настройка CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://192.168.1.*',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// middleware
app.use(express.json());

// подключение к БД
(async () => {
  try {
    await models.sequelize.authenticate();
    await models.sequelize.sync();
    console.log('Database connected!');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

// роуты
app.use('/api/weapons', weaponsRouter);
app.use('/api/auth', authRouter);

// документация
setupSwagger(app);

// функция для получения локального IP
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// запуск сервера
app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIpAddress();
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`Доступен в сети по адресу: http://${ip}:${PORT}`);
});