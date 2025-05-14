console.log('Trying to import from:', new URL('../middleware/validation.js', import.meta.url).pathname);


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Текущая директория:', __dirname);
console.log('Путь к validation.js:', path.resolve(__dirname, 'middleware', 'validation.js'));

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db.js';
import weaponsRouter from './routes/weapons.js';
import authRouter from './routes/auth.js';
import setupSwagger from './swagger.js';
import models from './models/index.js';



const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к БД

/*try {
  await sequelize.authenticate();
  console.log('Подключение к PostgreSQL успешно.');
} catch (err) {
  console.error('Ошибка подключения:', err);
}*/
(async () => {
  try {
    await models.sequelize.authenticate();
    await models.sequelize.sync();
    console.log('Database connected!');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

// Роуты
app.use('/api/weapons', weaponsRouter);
app.use('/api/auth', authRouter);

//
setupSwagger(app);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

