module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('role_permissions', {
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
          // 'ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_ROLES_PERMISSIONS" PRIMARY KEY ("role_id", "permission_id")'
          'ALTER TABLE role_permissions ADD CONSTRAINT PK_ROLES_PERMISSIONS PRIMARY KEY(role_id, permission_id)'
        );
      });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('role_permissions');
  },
};
