module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("user", (table) => {
      table.uuid("id").primary();
      table.string("auth0_id").notNullable();
      table.uuid("role_id").references("id").inTable("role");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("user");
  },
};
