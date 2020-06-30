module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'admin',
          display_name: 'Admin',
          description: 'Admin',
        },
        {
          name: 'manager',
          display_name: 'Manager',
          description: 'Manager',
        },
        {
          name: 'customer',
          display_name: 'Customer',
          description: 'Customer',
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
