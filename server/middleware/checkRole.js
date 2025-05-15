// проверяет, есть ли у пользователя нужная роль (admin/user)
export const checkRole = (requiredRole) => (req, res, next) => {
  const userRole = req.user?.role;
  
  if (userRole !== requiredRole) {
    return res.status(403).json({ error: 'Недостаточно прав' });
  }
  next();
};
export const checkAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Требуются права администратора' 
    });
  }
  next();
};