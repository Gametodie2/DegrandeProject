module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("category", (table) => {
      table.string("name").primary();
      table.string("price").notNullable();
      table.string("duration").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("category");
  },
};
