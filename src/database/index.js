import Sequelize from 'sequelize';
import dbConfig from '../config/database';

/* Models */
import User from '../app/models/User';
import Permissions from '../app/models/Permissions';
import Roles from '../app/models/Roles';
import RolesPermissions from '../app/models/RolesPermissions';
import UserPermissions from '../app/models/UserPermissions';
import UserRoles from '../app/models/UserRoles';

const models = [
  User,
  Permissions,
  Roles,
  RolesPermissions,
  UserPermissions,
  UserRoles,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
