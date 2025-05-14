export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  }, {
    timestamps: true,
  });

  // ассоциации (если есть)
  User.associate = (models) => {
    User.hasMany(models.Weapon, { foreignKey: 'userId' });
  };

  return User; // важно вернуть модель
};