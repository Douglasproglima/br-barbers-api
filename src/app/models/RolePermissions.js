import Sequelize, { Model } from 'sequelize';

class RolePermissions extends Model {
  static init(sequelize) {
    super.init(
      {
        role_id: Sequelize.INTEGER,
        permission_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Roles, {
      foreignKey: 'role_id',
      targetKey: 'id',
      as: 'Roles',
    });
    this.belongsTo(models.Permissions, {
      foreignKey: 'permission_id',
      targetKey: 'id',
      as: 'Permissions',
    });
  }
}

export default RolePermissions;
