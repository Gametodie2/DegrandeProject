// ============== Reservation API tests ==============
// Description: Test the Reservation API

// === Imports ===

// - Import Helpers
const { withServer } = require("../helpers");
// - Import data
const { tables } = require("../../src/data");

// === Data ===

const data = {
  reservation: [
    {
      id: "1",
      amount: 10,
      date: "2022-01-01T00:00:00",
      category_name: "abc",
      user_id: "z",
    },
    {
      id: "2",
      amount: 10,
      date: "2022-01-01T00:00:00",
      category_name: "abc",
      user_id: "z",
    },
  ],
  user: [
    {
      id: "z",
      auth0_id: "auth0|63a0e4843649a728b905d471",
      role_id: "zy",
    },
  ],
  role: [
    {
      id: "zy",
      name: "admin",
    },
  ],
  category: [
    {
      name: "abc",
      duration: "10:00:00",
      price: 10,
    },
  ],
};

const dataToDelete = {
  reservation: ["1", "2"],
  user: ["z"],
  role: ["zy"],
  category: ["abc"],
};

// === Tests ===

describe("Reservation", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ request: r, knex: k, authHeader: a }) => {
    request = r;
    knex = k;
    authHeader = a;
  });

  const url = "/api/reservations";

  // - get all reservations
  describe("GET /api/reservations", () => {
    beforeAll(async () => {
      await knex(tables.role).insert(data.role);
      await knex(tables.user).insert(data.user);
      await knex(tables.category).insert(data.category);
      await knex(tables.reservation).insert(data.reservation);
    });
    afterAll(async () => {
      await knex(tables.reservation)
        .whereIn("id", dataToDelete.reservation)
        .delete();
      await knex(tables.category)
        .whereIn("name", dataToDelete.category)
        .delete();
      await knex(tables.user).whereIn("id", dataToDelete.user).delete();
      await knex(tables.role).whereIn("id", dataToDelete.role).delete();
    });
    it("it should 200 and return all reservations", async () => {
      const response = await request.get(url).set("Authorization", authHeader);

      expect(response.status).toBe(200);

      expect(response.body.count).toBeGreaterThanOrEqual(2);
    });
  });

  // - get one reservation by id
  describe("GET /api/reservations/:id", () => {
    beforeAll(async () => {
      await knex(tables.role).insert(data.role);
      await knex(tables.user).insert(data.user);
      await knex(tables.category).insert(data.category);
      await knex(tables.reservation).insert(data.reservation[0]);
    });
    afterAll(async () => {
      await knex(tables.reservation)
        .where("id", data.reservation[0].id)
        .delete();
      await knex(tables.category)
        .whereIn("name", dataToDelete.category)
        .delete();
      await knex(tables.user).whereIn("id", dataToDelete.user).delete();
      await knex(tables.role).whereIn("id", dataToDelete.role).delete();
    });
    it("it should 200 and return the requested reservation", async () => {
      const response = await request
        .get(`${url}/${data.reservation[0].id}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(200);

      expect(response.body.amount).toBe(`${data.reservation[0].amount}`);
      expect(response.body.category_name).toBe(
        data.reservation[0].category_name
      );
      expect(response.body.user_id).toBe(data.reservation[0].user_id);
    });
  });

  // - delete one reservation by id
  describe("DELETE /api/reservations/:id", () => {
    beforeAll(async () => {
      await knex(tables.role).insert(data.role);
      await knex(tables.user).insert(data.user);
      await knex(tables.category).insert(data.category);
      await knex(tables.reservation).insert(data.reservation[0]);
    });
    afterAll(async () => {
      await knex(tables.category)
        .whereIn("name", dataToDelete.category)
        .delete();
      await knex(tables.user).whereIn("id", dataToDelete.user).delete();
      await knex(tables.role).whereIn("id", dataToDelete.role).delete();
    });
    it("it should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/${data.reservation[0].id}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(204);

      expect(response.body).toEqual({});
    });
  });
});
