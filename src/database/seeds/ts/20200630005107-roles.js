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
        description: 'Gerente',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'customer',
        display_name: 'Customer',
        description: 'Cliente',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
