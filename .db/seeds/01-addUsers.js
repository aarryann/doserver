const faker = require('faker');
const fs = require("fs");

const createFakeUser = () => ({
  firstName: faker.name.firstName(1),
  lastName: faker.name.lastName(1),
  email: faker.internet.email('firstName', 'lastName'),
  gender: faker.gender
});

exports.seed = function(knex) {
  console.log(createFakeUser());
  // Deletes ALL existing entries
  //return knex('subject').del()
  //  .then(function () {
      // Inserts seed entries
  //    return knex('subject').insert([
  //      {id: 1, colName: 'rowValue1'},
  //      {id: 2, colName: 'rowValue2'},
  //      {id: 3, colName: 'rowValue3'}
   //   ]);
  //  });
};
