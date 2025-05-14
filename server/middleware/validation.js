import { body, validationResult } from 'express-validator';

// Для аутентификации (используется в auth.js)
export const validateAuth = [
  body('email').isEmail().withMessage('Некорректный email'),
  body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// Для оружия (используется в weapons.js)
export const weaponValidationRules = [
  body('name').notEmpty().withMessage('Название обязательно'),
  body('type').isIn(['Straight Sword', 'Greatsword', 'Axe']).withMessage('Неверный тип оружия'),
  body('damage').isInt({ min: 0 }).withMessage('Урон должен быть положительным числом'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// export default { validateAuth };