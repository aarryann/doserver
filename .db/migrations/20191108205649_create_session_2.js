//CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
exports.up = knex => {
  return knex.schema.createTable("sessions", table => {
    table.uuid("uid").defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id", "sessionUserFK")
      .inTable("User");
    table
      .timestamp("expiry", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("now()+ '1 year'::interval"));
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists("sessions");
};
