import { Sequelize, DataTypes } from 'sequelize';
import User from './User.js';
import Weapon from './Weapon.js';

export { Weapon };
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const models = {
  User: User(sequelize, DataTypes),
  Weapon: Weapon(sequelize, DataTypes),
  sequelize: sequelize,
  Sequelize: Sequelize,
};

// установка ассоциаций
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;