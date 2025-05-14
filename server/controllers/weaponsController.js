import models from '../models/index.js';

export const getAllWeapons = async (req, res) => {
  try {
    const weapons = await models.Weapon.findAll(); // теперь findAll() должен быть доступен по идее
    res.json(weapons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createWeapon = async (req, res) => {
  try {
    const { name, type, damage, weight, scaling, requiredAttributes, description, imageUrl } = req.body;
    const weapon = await models.Weapon.create({
      name,
      type,
      damage,
      weight,
      scaling,
      requiredAttributes,
      description,
      imageUrl,
      userId: req.user.id, // ID пользователя, который добавил оружие
    });
    res.status(201).json(weapon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getWeaponById = async (req, res) => {
  try {
    const weapon = await models.Weapon.getWeaponById(req.body);
    res.status(201).json(weapon);
  } catch (err) {
    res.status(400).json({ error:err.message});
  }
};

export const updateWeapon = async (req, res) => {
  try {
    const weapon = await models.Weapon.update(req.body, {
      where: { id: req.params.id }
    });
    res.json(weapon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*
export const deleteWeapon = async (req, res) => {
  try {
    const weapon = await models.Weapon.deleteWeapon(req.body);
    res.status(201).json(weapon);
  } catch (err) {
    res.status(400).json({ error:err.message});
  }

};
*/

export const deleteWeapon = async (req, res) => {
  try {
    // замена на destroy()
    const result = await models.Weapon.destroy({
      where: { id: req.params.id }
    });
    
    if (result === 0) {
      return res.status(404).json({ error: 'Оружие не найдено' });
    }
    
    res.status(204).end(); // 204 No Content при успешном удалении
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getWeaponsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const weapons = await models.Weapon.findAll({ where: { type } });
    res.json(weapons);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};