// ============== Category API tests ==============
// Description: Test the category API

// === Imports ===

// - Import Helpers
const { withServer } = require("../helpers");
// - Import data
const { tables } = require("../../src/data");

// === Data ===

const data = {
  category: [
    { name: "category 1", price: "10", duration: "02:00:00" },
    { name: "category 2", price: "20", duration: "03:00:00" },
    { name: "category 3", price: "30", duration: "04:00:00" },
  ],
  user: [
    {
      id: "1",
      auth0_id: "auth0|63a0e4843649a728b905d471",
      role_id: "37b7d86b-e11d-44eb-b55d-d8424336d2bc",
    },
  ],
  role: [
    {
      id: "37b7d86b-e11d-44eb-b55d-d8424336d2bc",
      name: "admin",
    },
  ],
};

const dataToDelete = {
  category: ["category 1", "category 2", "category 3"],
  user: ["1"],
  role: ["37b7d86b-e11d-44eb-b55d-d8424336d2bc"],
};

// === Tests ===

describe("Category", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ request: r, knex: k, authHeader: a }) => {
    request = r;
    knex = k;
    authHeader = a;
  });

  const url = "/api/categories";

  // - get all categories
  describe("GET /api/categories", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.category);
    });

    afterAll(async () => {
      await knex(tables.category)
        .whereIn("name", dataToDelete.category)
        .delete();
    });

    test("it should 200 and return all categories", async () => {
      const response = await request.get(url).set("Authorization", authHeader);

      expect(response.status).toBe(200);

      expect(response.body.count).toBeGreaterThanOrEqual(3);
      expect(response.body.items.length).toBeGreaterThanOrEqual(3);
    });
  });
  // - get a category by name
  describe("GET /api/categories/:name", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.category[0]);
    });

    afterAll(async () => {
      await knex(tables.category).where("name", data.category[0].name).delete();
    });

    test("it should 200 and return the requested category", async () => {
      const response = await request
        .get(`${url}/${data.category[0].name}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(200);

      expect(response.body).toEqual(data.category[0]);
    });
  });

  // - delete a category
  describe("DELETE /api/categories/:name", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.category[0]);
    });

    test("it should 204 and return no content", async () => {
      const response = await request
        .delete(`${url}/${data.category[0].name}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  // - update a category
  describe("PUT /api/categories/:name", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.category[0]);
    });

    afterAll(async () => {
      await knex(tables.category).where("name", data.category[0].name).delete();
    });

    test("it should 200 and return the updated category", async () => {
      const response = await request
        .put(`${url}/${data.category[0].name}`)
        .set("Authorization", authHeader)
        .send({ price: "10", duration: "02:00:00" });

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        name: "category 1",
        price: "10",
        duration: "02:00:00",
      });
    });
  });
});
