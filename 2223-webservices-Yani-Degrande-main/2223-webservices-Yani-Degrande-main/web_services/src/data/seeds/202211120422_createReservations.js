module.exports = {
  seed: async (knex) => {
    await knex("reservation").insert([
      {
        id: "d896c546-a91c-4ff3-88dd-4ddb916911d8",
        date: new Date("2022-11-12T12:00:00.000Z"),
        amount: 2,
        user_id: "21cc4820-8470-4379-a647-2f831080cdeb",
        category_name: "basic",
      },
      {
        id: "59a8dcde-7c2d-403f-8f74-a62a4c362054",
        date: new Date("2022-11-12T12:00:00.000Z"),
        amount: 5,
        user_id: "32a25006-4f09-4176-8b2b-05edba8250c1",
        category_name: "deluxe",
      },
    ]);
  },
};
