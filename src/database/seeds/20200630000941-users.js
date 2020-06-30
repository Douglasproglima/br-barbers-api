module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          email: 'admin@admin.com',
          password_hash: '123456',
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
