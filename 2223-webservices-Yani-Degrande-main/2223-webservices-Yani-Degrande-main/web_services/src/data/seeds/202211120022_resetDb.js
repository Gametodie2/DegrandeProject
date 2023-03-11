const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // first delete all entries in every table
    await knex(tables.reservation).delete();
    await knex(tables.category).delete();
    await knex(tables.user).delete();
    await knex(tables.role).delete();
    console.log("Database reset");
  },
};
