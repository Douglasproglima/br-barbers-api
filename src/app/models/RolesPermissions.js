import Sequelize, { Model } from 'sequelize';

class RolesPermissions extends Model {
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
}

export default RolesPermissions;
