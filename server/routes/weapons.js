import express from 'express';
import {
  getAllWeapons,
  getWeaponById,
  createWeapon,
  updateWeapon,
  deleteWeapon,
  getWeaponsByType
} from '../controllers/weaponsController.js';
import { checkToken } from '../middleware/checkToken.js';
import { weaponValidationRules } from '../middleware/validation.js';
import { checkRole, checkAdmin } from '../middleware/checkRole.js'; // Проверка ролей (admin/user)
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// GET /api/weapons — список всего оружия
router.get('/', getAllWeapons);

// GET /api/weapons/:id — оружие по ID
router.get('/:id', getWeaponById);

// // GET /api/weapons//type/:type — оружие по типу (угс, гс, кгс и тд)
router.get('/type/:type', getWeaponsByType);

// изменение данных доступно только администраторам

// POST /api/weapons — создать оружие
//router.post('/', checkRole('admin'), weaponValidationRules, createWeapon);
router.post('/', checkToken, checkAdmin, createWeapon);

// PUT /api/weapons/:id — обновить оружие
router.put('/:id', checkToken, checkAdmin, updateWeapon);

// DELETE /api/weapons/:id — удалить оружие
router.delete('/:id', checkToken, checkAdmin, deleteWeapon);

// загрузка изображений (тест)
router.post('/upload', checkToken, checkAdmin, upload.single('image'), (req, res) => {
  res.json({ path: req.file.path });
});

export default router;