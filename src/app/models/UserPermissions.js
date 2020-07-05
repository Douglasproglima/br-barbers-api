import Sequelize, { Model } from 'sequelize';

class UserPermissions extends Model {
  static init(sequelize) {
    super.init(
      {
        // user_id: Sequelize.INTEGER,
        // permission_id: Sequelize.INTEGER,
        user_type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
    this.belongsTo(models.Permissions, {
      foreignKey: 'permission_id',
      as: 'Permissions',
    });
  }
}

export default UserPermissions;
