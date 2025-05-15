import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from '../models/index.js'; // Импортируем models, а не User напрямую

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Используем models.User вместо User
    const user = await models.User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) throw new Error('Пользователь не найден');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Неверный пароль');

    const token = generateToken(user);
    res.json({
      token,
      role: user.role // без этого админ не входит через окошко?
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};