module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("role", (table) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("role");
  },
};
