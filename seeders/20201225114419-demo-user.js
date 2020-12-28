module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'John',
      password: 'Doe',
      email: 'example@example.com',
      firstname: 'Jonny',
      lastname: 'Doey',
      phone: '911',
      city: 'There',
      country: 'Here',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
