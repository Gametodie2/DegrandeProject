module.exports = {
  up: async (knex) => {
    await knex.schema.createTable("reservation", (table) => {
      table.uuid("id").primary();
      table.dateTime("date").notNullable();
      table.string("amount").notNullable();
      table.uuid("user_id").references("id").inTable("user");
      table.uuid("category_name").references("name").inTable("category");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists("reservation");
  },
};
