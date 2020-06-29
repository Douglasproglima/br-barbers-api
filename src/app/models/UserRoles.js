import Sequelize, { Model } from 'sequelize';

class UserRoles extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        role_id: Sequelize.INTEGER,
        user_type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default UserRoles;
