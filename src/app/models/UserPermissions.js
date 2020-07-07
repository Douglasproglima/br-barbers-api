import Sequelize, { Model } from 'sequelize';

class UserPermissions extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        permission_id: Sequelize.INTEGER,
        user_type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      sourceKey: 'id',
      as: 'user',
    });
    this.hasMany(models.Permissions, {
      foreignKey: 'permission_id',
      sourceKey: 'id',
      targetKey: 'id',
      as: 'permissions',
    });
  }
}

export default UserPermissions;
