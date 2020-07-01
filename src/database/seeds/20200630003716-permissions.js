module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Permissions', [
      {
        name: 'read-admin-panel',
        display_name: 'Read Admin Panel',
        description: 'Read Admin Panel',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'read-api',
        display_name: 'Read Api',
        description: 'Read Api',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'create-auth-users',
        display_name: 'Create Auth Users',
        description: 'Create Auth Users',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'read-auth-users',
        display_name: 'Read Auth Users',
        description: 'Read Auth Users',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'update-auth-users',
        display_name: 'Update Auth Users',
        description: 'Update Auth Users',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'delete-auth-users',
        display_name: 'Delete Auth Users',
        description: 'Delete Auth Users',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'create-auth-roles',
        display_name: 'Create Auth Roles',
        description: 'Create Auth Roles',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'read-auth-roles',
        display_name: 'Read Auth Roles',
        description: 'Read Auth Roles',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'update-auth-roles',
        display_name: 'Update Auth Roles',
        description: 'Update Auth Roles',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'delete-auth-roles',
        display_name: 'Delete Auth Roles',
        description: 'Delete Auth Roles',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'create-auth-permissions',
        display_name: 'Create Auth Permissions',
        description: 'Create Auth Permissions',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'read-auth-permissions',
        display_name: 'Read Auth Permissions',
        description: 'Read Auth Permissions',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'update-auth-permissions',
        display_name: 'Update Auth Permissions',
        description: 'Update Auth Permissions',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'delete-auth-permissions',
        display_name: 'Delete Auth Permissions',
        description: 'Delete Auth Permissions',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'read-auth-profile',
        display_name: 'Read Auth Profile',
        description: 'Read Auth Profile',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'update-auth-profile',
        display_name: 'Update Auth Profile',
        description: 'Update Auth Profile',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Permissions', null, {});
  },
};
