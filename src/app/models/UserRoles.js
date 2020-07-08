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

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    this.belongsTo(models.Roles, {
      foreignKey: 'role_id',
      as: 'roles',
    });
  }
}

export default UserRoles;
