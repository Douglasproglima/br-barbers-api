module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('user_permissions', {
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
        permission_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'permissions',
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
          'ALTER TABLE "user_permissions" ADD CONSTRAINT "PK_USER_PERMISSIONS" PRIMARY KEY ("user_id", "permission_id", "user_type")'
        );
      });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user_permissions');
  },
};
