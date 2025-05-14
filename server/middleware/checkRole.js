// проверяет, есть ли у пользователя нужная роль (admin/user)
export default (requiredRole) => (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }
    next();
  };