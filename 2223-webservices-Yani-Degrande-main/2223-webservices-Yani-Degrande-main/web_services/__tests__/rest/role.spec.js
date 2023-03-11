// ============== Role API tests ==============
// Description: Test the Role API

// === Imports ===

// - Import Helpers
const { withServer } = require("../helpers");
// - Import data
const { tables } = require("../../src/data");

// === Data ===

const data = {
  role: [
    { id: "14463833-f407-41ce-8c09-9ec29eb75221", name: "user" },
    { id: "4b3d6a3d-2b39-4c58-90cb-5dbc6970a96d", name: "admin" },
    { id: "37b7d86b-e11d-44eb-b55d-d8424336d2bc", name: "employee" },
  ],
};

const dataToDelete = {
  role: [
    "14463833-f407-41ce-8c09-9ec29eb75221",
    "4b3d6a3d-2b39-4c58-90cb-5dbc6970a96d",
    "37b7d86b-e11d-44eb-b55d-d8424336d2bc",
  ],
};

// === Tests ===

describe("Role", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ request: r, knex: k, authHeader: a }) => {
    request = r;
    knex = k;
    authHeader = a;
  });

  const url = "/api/roles";

  // - get all roles
  describe("GET /api/roles", () => {
    beforeAll(async () => {
      await knex(tables.role).insert(data.role);
    });

    afterAll(async () => {
      await knex(tables.role).whereIn("id", dataToDelete.role).delete();
    });

    it("it should 200 and return all roles", async () => {
      const response = await request.get(url).set("Authorization", authHeader);

      expect(response.status).toBe(200);

      expect(response.body.count).toBeGreaterThanOrEqual(2);
      expect(response.body.items.length).toBeGreaterThanOrEqual(2);
    });
  });

  // - get role by id
  describe("GET /api/roles/:id", () => {
    beforeAll(async () => {
      await knex(tables.role).insert(data.role[0]);
    });

    afterAll(async () => {
      await knex(tables.role).where("id", data.role[0].id).delete();
    });

    it("it should 200 and return the role", async () => {
      const response = await request
        .get(`${url}/${data.role[0].id}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(data.role[0].name);
    });
  });

  // - create role
  describe("POST /api/roles", () => {
    const rolesToDelete = [];
    const postData = { name: "cleaner" };

    beforeAll(async () => {
      await knex(tables.role).insert(data.role[2]);
    });

    afterAll(async () => {
      await knex(tables.role).whereIn("id", rolesToDelete).delete();
      await knex(tables.user).delete();
      await knex(tables.role).where("id", data.role[2].id).delete();
    });

    it("it should 201 and return the created role", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send(postData);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(postData.name);

      rolesToDelete.push(response.body.id);
    });
  });

  // - update role
  describe("PUT /api/roles/:id", () => {
    const putData = { name: "cleaner" };

    beforeAll(async () => {
      await knex(tables.role).whereIn("id", dataToDelete.role).delete();
      await knex(tables.role).insert(data.role);
    });

    afterAll(async () => {
      await knex(tables.role).whereIn("id", dataToDelete.role).delete();
    });

    it("it should 200 and return the updated role", async () => {
      const response = await request
        .put(`${url}/${data.role[0].id}`)
        .set("Authorization", authHeader)
        .send(putData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("cleaner");
    });
  });

  // - delete role
  describe("DELETE /api/roles/:id", () => {
    beforeAll(async () => {
      await knex(tables.role).insert(data.role[0]);
    });

    it("it should 204 and return the deleted role", async () => {
      const response = await request
        .delete(`${url}/${data.role[0].id}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});
