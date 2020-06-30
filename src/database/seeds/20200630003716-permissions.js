module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'read-admin-panel',
          display_name: 'Read Admin Panel',
          description: 'Read Admin Panel',
        },
        {
          name: 'read-api',
          display_name: 'Read Api',
          description: 'Read Api',
        },
        {
          name: 'read-admin-panel',
          display_name: 'Read Admin Panel',
          description: 'Read Admin Panel',
        },
        {
          name: 'create-auth-users',
          display_name: 'Create Auth Users',
          description: 'Create Auth Users',
        },
        {
          name: 'read-auth-users',
          display_name: 'Read Auth Users',
          description: 'Read Auth Users',
        },
        {
          name: 'read-admin-panel',
          display_name: 'Read Admin Panel',
          description: 'Read Admin Panel',
        },
        {
          name: 'update-auth-users',
          display_name: 'Update Auth Users',
          description: 'Update Auth Users',
        },
        {
          name: 'delete-auth-users',
          display_name: 'Delete Auth Users',
          description: 'Delete Auth Users',
        },
        {
          name: 'create-auth-roles',
          display_name: 'Create Auth Roles',
          description: 'Create Auth Roles',
        },
        {
          name: 'read-auth-roles',
          display_name: 'Read Auth Roles',
          description: 'Read Auth Roles',
        },
        {
          name: 'update-auth-roles',
          display_name: 'Update Auth Roles',
          description: 'Update Auth Roles',
        },
        {
          name: 'delete-auth-roles',
          display_name: 'Delete Auth Roles',
          description: 'Delete Auth Roles',
        },
        {
          name: 'create-auth-permissions',
          display_name: 'Create Auth Permissions',
          description: 'Create Auth Permissions',
        },
        {
          name: 'read-auth-permissions',
          display_name: 'Read Auth Permissions',
          description: 'Read Auth Permissions',
        },
        {
          name: 'update-auth-permissions',
          display_name: 'Update Auth Permissions',
          description: 'Update Auth Permissions',
        },
        {
          name: 'delete-auth-permissions',
          display_name: 'Delete Auth Permissions',
          description: 'Delete Auth Permissions',
        },
        {
          name: 'read-auth-profile',
          display_name: 'Read Auth Profile',
          description: 'Read Auth Profile',
        },
        {
          name: 'update-auth-profile',
          display_name: 'Update Auth Profile',
          description: 'Update Auth Profile',
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('Permissions', null, {}),
};
