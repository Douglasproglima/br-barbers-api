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
  /*
  static associate(models) {
    this.belongsTo(models.RolesPermissions, { foreignKey: 'permission_id' });
  } */
}

export default Permissions;
