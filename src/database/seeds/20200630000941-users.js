module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password_hash:
          '$2a$08$GX7iZn1UitqQzS5zfIWTpuSz59ejrtCbUnpltluA3Gyw37tct9uxa',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
