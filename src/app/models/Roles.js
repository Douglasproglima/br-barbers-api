import Sequelize, { Model } from 'sequelize';

class Roles extends Model {
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
    this.hasMany(models.UserRoles, {
      foreignKey: 'user_id',
      targetKey: 'id',
      sourceKey: 'id',
      as: 'user_roles',
    });
    this.belongsToMany(models.RolePermissions, {
      foreignKey: 'role_id',
      otherKey: 'id',
      as: 'role_permissions',
      through: 'Permissions',
    });
  }
}

export default Roles;
