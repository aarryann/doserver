// eslint-disable-next-line
exports.seed = async function (knex, Promise) {
  return knex('LastNames')
    .then(() =>
      knex('LastNames').insert([
      ])
    );
};
