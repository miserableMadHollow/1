export default (sequelize, DataTypes) => {
    const Weapon = sequelize.define('Weapon', {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      type: { type: DataTypes.STRING, allowNull: false },
      damage: { type: DataTypes.INTEGER, allowNull: false },
      weight: { type: DataTypes.FLOAT, allowNull: false },
      scaling: { type: DataTypes.JSON, allowNull: false },
      requiredAttributes: { type: DataTypes.JSON, allowNull: false },
      description: { type: DataTypes.TEXT },
      imageUrl: { type: DataTypes.STRING },
    });
  
    return Weapon;
  };