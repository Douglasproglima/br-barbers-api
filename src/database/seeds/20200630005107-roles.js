module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        display_name: 'Admin',
        description: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'manager',
        display_name: 'Manager',
        description: 'Manager',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'customer',
        display_name: 'Customer',
        description: 'Customer',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
