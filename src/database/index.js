import Sequelize from 'sequelize';
import dbConfig from '../config/database';

/* Models */
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import Permissions from '../app/models/Permissions';
import Roles from '../app/models/Roles';
import RolePermissions from '../app/models/RolePermissions';
import UserPermissions from '../app/models/UserPermissions';
import UserRoles from '../app/models/UserRoles';

const models = [
  User,
  File,
  Appointment,
  Permissions,
  Roles,
  RolePermissions,
  UserPermissions,
  UserRoles,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    const connection = new Sequelize(dbConfig);
    models.forEach((md) => md.init(connection));
    models.forEach((md) => md.associate && md.associate(connection.models));
  }
}

export default new Database();
