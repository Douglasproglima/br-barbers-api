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

  static associate(models) {
    this.hasMany(models.UserPermissions, {
      foreignKey: 'permission_id',
      as: 'user_permissions',
      // targetKey: 'permission_id',
      // sourceKey: 'id',
    });

    /* this.belongsToMany(models.UserPermissions, {
      // otherKey: '',
      through: 'User',
      foreignKey: 'permission_id',
      as: 'users',
    }); */
    /*
    this.belongsToMany(models.User, {
      // otherKey: '',
      through: 'UserPermissions',
      foreignKey: 'user_id',
      as: 'user_permissions',
    });
    this.hasMany(models.RolePermissions, {
      foreignKey: 'id',
      targetKey: 'role_id',
      sourceKey: 'id',
      as: 'role_permissions',
    });
    */
  }
}

export default Permissions;
