import Sequelize, { Model } from 'sequelize';

class RolesPermissions extends Model {
  static init(sequelize) {
    super.init(
      {
        // role_id: Sequelize.INTEGER,
        // permission_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Roles, { foreignKey: 'role_id', as: 'Roles' });
    this.belongsTo(models.Permissions, {
      foreignKey: 'permission_id',
      as: 'Permissions',
    });
  }
}

export default RolesPermissions;
