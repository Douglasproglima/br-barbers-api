module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('User_Roles', [
      {
        user_id: 1,
        role_id: 1,
        user_type: 'users',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('User_Roles', null, {});
  },
};
