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
  /*
  static associate(models) {
    this.belongsTo((models.UserRoles, models.RolesPermissions), {
      foreignKey: 'role_id',
    });
    // this.belongsTo(models.RolesPermissions, { foreignKey: 'role_id' });
  } */
}

export default Roles;
