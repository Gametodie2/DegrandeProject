module.exports = {
  seed: async (knex) => {
    await knex("category").insert([
      {
        name: "basic",
        price: "15",
        duration: "02:00",
      },
      {
        name: "deluxe",
        price: "18",
        duration: "04:00",
      },
    ]);
  },
};
