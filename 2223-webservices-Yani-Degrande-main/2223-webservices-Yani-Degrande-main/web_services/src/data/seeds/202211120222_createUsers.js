module.exports = {
  seed: async (knex) => {
    await knex("user").insert([
      {
        id: "21cc4820-8470-4379-a647-2f831080cdeb",
        auth0_id: "google-oauth2|113152158225915211172",
        role_id: "37b7d86b-e11d-44eb-b55d-d8424336d2bc",
      },
      {
        id: "32a25006-4f09-4176-8b2b-05edba8250c1",
        auth0_id: "unknown",
        role_id: "ef6173b9-984b-4c86-a928-ff861db5abcb",
      },
      {
        id: "61428c75-9298-4492-ab72-2296ed457256",
        auth0_id: "auth0|63a0e4843649a728b905d471",
        role_id: "37b7d86b-e11d-44eb-b55d-d8424336d2bc",
      },
    ]);
  },
};
