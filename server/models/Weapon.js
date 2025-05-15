import { DataTypes } from 'sequelize';

export default function(sequelize) {
  const Weapon = sequelize.define('Weapon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
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
      allowNull: false,
      defaultValue: {
        strength: '-',
        dexterity: '-',
        intelligence: '-',
        faith: '-'
      }
    },
    requiredAttributes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        strength: 0,
        dexterity: 0,
        intelligence: 0,
        faith: 0
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  Weapon.associate = function(models) {
    Weapon.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator'
    });
  };

  return Weapon;
}