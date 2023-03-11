module.exports = {
  seed: async (knex) => {
    await knex("role").insert([
      { id: "ef6173b9-984b-4c86-a928-ff861db5abcb", name: "customer" },
      { id: "37b7d86b-e11d-44eb-b55d-d8424336d2bc", name: "employee" },
    ]);
  },
};
