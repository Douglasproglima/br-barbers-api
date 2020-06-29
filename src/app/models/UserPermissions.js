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
}

export default UserPermissions;
