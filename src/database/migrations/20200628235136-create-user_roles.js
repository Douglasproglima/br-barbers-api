module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('user_roles', {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        user_type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      })
      .then(() => {
        return queryInterface.sequelize.query(
          'ALTER TABLE "user_roles" ADD CONSTRAINT "PK_USER_ROLES" PRIMARY KEY ("user_id", "role_id", "user_type")'
        );
      });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user_roles');
  },
};
