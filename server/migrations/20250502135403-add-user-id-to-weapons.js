import { Sequelize } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Weapons', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Weapons', 'userId');
  }
};