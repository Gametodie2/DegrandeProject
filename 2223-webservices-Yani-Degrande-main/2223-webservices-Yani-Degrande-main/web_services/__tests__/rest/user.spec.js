// ============== User API tests ==============
// Description: Test the User API

// === Imports ===

// - Import Helpers
const { withServer } = require("../helpers");
// - Import data
const { tables } = require("../../src/data");

// === Data ===

const data = {
  user: [
    {
      id: "1",
      auth0_id: "auth0|63a0e4843649a728b905d471",
      role_id: "1",
    },
    {
      id: "2",
      auth0_id: "unknown",
      role_id: "2",
    },
  ],
  role: [
    {
      id: "1",
      name: "admin",
    },
    {
      id: "2",
      name: "user",
    },
  ],
};

const dataToDelete = {
  user: ["1", "2"],
  role: ["1", "2"],
};

// === Tests ===

describe("User", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ request: r, knex: k, authHeader: a }) => {
    request = r;
    knex = k;
    authHeader = a;
  });

  const url = "/api/users";

  // - get all users
  describe("GET /api/users", () => {
    beforeAll(async () => {
      await knex(tables.role).insert(data.role);
      await knex(tables.user).insert(data.user);
    });

    afterAll(async () => {
      await knex(tables.user).whereIn("id", dataToDelete.user).delete();
      await knex(tables.role).whereIn("id", dataToDelete.role).delete();
    });

    it("it should 200 and return all users", async () => {
      const res = await request.get(url).set("Authorization", authHeader);

      expect(res.status).toBe(200);

      expect(res.body.count).toBeGreaterThanOrEqual(2);
    });
  });

  // - get user by auth0_id
  describe("GET /api/users/:id", () => {
    beforeAll(async () => {
      await knex(tables.role).insert(data.role[0]);
      await knex(tables.user).insert(data.user[0]);
    });

    afterAll(async () => {
      await knex(tables.user).where("id", data.user[0].id).delete();
      await knex(tables.role).where("id", data.role[0].id).delete();
    });

    it("it should 200 and return the user", async () => {
      const res = await request
        .get(`${url}/${data.user[0].auth0_id}`)
        .set("Authorization", authHeader);

      expect(res.status).toBe(200);

      expect(res.body.id).toBe(data.user[0].id);
      expect(res.body.auth0_id).toBe(data.user[0].auth0_id);
      expect(res.body.role_id).toBe(data.user[0].role_id);
    });
  });

  // - update user by id
  describe("PUT /api/users/:id", () => {
    const putData = {
      auth0_id: "auth0|63a0e4843649a728b905d471",
      role_id: "2",
    };

    beforeAll(async () => {
      await knex(tables.role).insert(data.role);
      await knex(tables.user).insert(data.user[0]);
    });

    afterAll(async () => {
      await knex(tables.user).where("id", data.user[0].id).delete();
      await knex(tables.role).whereIn("id", dataToDelete.role).delete();
    });

    it("it should 200 and return the updated user", async () => {
      const res = await request
        .put(`${url}/${data.user[0].id}`)
        .set("Authorization", authHeader)
        .send(putData);

      expect(res.status).toBe(200);

      expect(res.body.auth0_id).toBe(putData.auth0_id);
      expect(res.body.role_id).toBe(putData.role_id);
    });
  });

  // - delete user by id
  describe("DELETE /api/users/:id", () => {
    beforeAll(async () => {
      await knex(tables.role).insert(data.role[0]);
      await knex(tables.user).insert(data.user[0]);
    });

    afterAll(async () => {
      await knex(tables.role).where("id", data.role[0].id).delete();
    });

    it("it should 204 and return nothing", async () => {
      const res = await request
        .delete(`${url}/${data.user[0].id}`)
        .set("Authorization", authHeader);

      expect(res.status).toBe(204);

      expect(res.body).toEqual({});
    });
  });
});
