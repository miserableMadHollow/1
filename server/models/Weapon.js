/*import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Weapon = sequelize.define('Weapon', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 100]
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Straight Sword', 'Greatsword', 'Ultra Greatsword', 'Curved Sword', 'Katana', 'Dagger', 'Spear', 'Halberd', 'Axe', 'Greataxe', 'Hammer', 'Great Hammer', 'Fist', 'Bow', 'Crossbow', 'Staff', 'Chime', 'Pyromancy Flame', 'Shield']]
        }
      },
      damage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      scaling: {
        type: DataTypes.JSON,
        allowNull: false
      },
      requiredAttributes: {
        type: DataTypes.JSON,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      imageUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      }
    }, {});
  
    Weapon.associate = function(models) {
      Weapon.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Weapon;
  };*/

  export default (sequelize, DataTypes) => {
    const Weapon = sequelize.define('Weapon', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 100],
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Straight Sword', 'Greatsword', 'Ultra Greatsword', 'Curved Sword', 'Katana', 'Dagger', 'Spear', 'Halberd', 'Axe', 'Greataxe', 'Hammer', 'Great Hammer', 'Fist', 'Bow', 'Crossbow', 'Staff', 'Chime', 'Pyromancy Flame', 'Shield']], // Пример типов
        },
      },
      damage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      scaling: {
        type: DataTypes.JSON,
        allowNull: false
      },
      requiredAttributes: {
        type: DataTypes.JSON,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      imageUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      }
    }, {
      timestamps: true, // Добавляет createdAt и updatedAt
    });
  
    Weapon.associate = (models) => {
      Weapon.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Weapon; // важно вернуть модель?
  };