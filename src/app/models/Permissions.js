import Sequelize, { Model } from 'sequelize';

class Permissions extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        display_name: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.UserPermissions, {
      foreignKey: 'id',
      targetKey: 'permission_id',
      sourceKey: 'id',
      as: 'user_permissions',
    });
    this.hasMany(models.RolePermissions, {
      foreignKey: 'id',
      targetKey: 'role_id',
      sourceKey: 'id',
      as: 'role_permissions',
    });
  }
}

export default Permissions;
