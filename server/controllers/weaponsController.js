import models from '../models/index.js';
import { Weapon } from '../models/index.js';

export const getAllWeapons = async (req, res) => {
  try {
    const weapons = await models.Weapon.findAll({
      include: [{
        model: models.User,
        as: 'creator',
        attributes: ['id', 'username']
      }]
    });
    res.json(weapons);
  } catch (err) {
    console.error('Ошибка при получении оружия:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createWeapon = async (req, res) => {
  try {
    const { name, type, damage, weight, scaling, requiredAttributes, description, imageUrl } = req.body;
    
    // Валидация обязательных полей
    if (!name || !type || damage === undefined || weight === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const weapon = await models.Weapon.create({
      name,
      type,
      damage,
      weight,
      scaling: scaling || {
        strength: '',
        dexterity: '',
        intelligence: '',
        faith: ''
      },
      requiredAttributes: requiredAttributes || {
        strength: 0,
        dexterity: 0,
        intelligence: 0,
        faith: 0
      },
      description,
      imageUrl,
      userId: req.user.id
    });

    res.status(201).json(weapon);
  } catch (err) {
    console.error('Ошибка при создании оружия:', err);
    
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(e => e.message);
      return res.status(400).json({ errors });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWeaponById = async (req, res) => {
  try {
    const weapon = await models.Weapon.findByPk(req.params.id, {
      include: [{
        model: models.User,
        as: 'creator',
        attributes: ['id', 'username']
      }]
    });

    if (!weapon) {
      return res.status(404).json({ error: 'Weapon not found' });
    }

    res.json(weapon);
  } catch (err) {
    console.error('Ошибка при получении оружия:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateWeapon = async (req, res) => {
  try {
    const [updated] = await models.Weapon.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Weapon not found' });
    }

    const updatedWeapon = await models.Weapon.findByPk(req.params.id);
    res.json(updatedWeapon);
  } catch (err) {
    console.error('Ошибка при обновлении оружия:', err);
    
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(e => e.message);
      return res.status(400).json({ errors });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteWeapon = async (req, res) => {
  try {
    const deleted = await models.Weapon.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Weapon not found' });
    }

    res.status(204).end();
  } catch (err) {
    console.error('Ошибка при удалении оружия:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWeaponsByType = async (req, res) => {
  try {
    const weapons = await models.Weapon.findAll({
      where: { type: req.params.type },
      include: [{
        model: models.User,
        as: 'creator',
        attributes: ['id', 'username']
      }]
    });

    if (weapons.length === 0) {
      return res.status(404).json({ error: 'No weapons of this type found' });
    }

    res.json(weapons);
  } catch (err) {
    console.error('Ошибка при получении оружия по типу:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};