// =========== Reservation REST ===========
// - REST for reservation related operations

// ==== Imports ====

// - Import router
const Router = require("@koa/router");
// - Import Joi
const Joi = require("joi");

// - Import logger
const { getLogger } = require("../core/logging");
// - Import auth
const { hasPermission, permissions, addUserInfo } = require("../core/auth");
// - Import services
const userService = require("../service/user");
const reservationService = require("../service/reservation");

// - Import validation
const validate = require("./_validation");
// - Import mailer
const { sendEmail } = require("./_mail");

// ==== Functions ====

// - Get all reservations
const getAllReservations = async (ctx) => {
  ctx.body = await reservationService.getAll();
};
getAllReservations.validationScheme = null;

// - Create a reservation
const createReservation = async (ctx) => {
  const logger = getLogger();
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    userId = await userService.create({
      auth0_id: ctx.state.user.sub,
      role_id: "ef6173b9-984b-4c86-a928-ff861db5abcb",
    });
  }

  const newReservation = await reservationService.create({
    date: ctx.request.body.date,
    amount: ctx.request.body.amount,
    category_name: ctx.request.body.category_name,
    user_id: ctx.request.body.user_id,
    userId,
  });
  logger.info(ctx.request.body.email);
  await sendEmail(
    ctx.request.body.email,
    ctx.request.body.date,
    ctx.request.body.amount,
    ctx.request.body.category_name
  );
  ctx.body = newReservation;
  ctx.status = 201;
};

createReservation.validationScheme = {
  body: {
    date: Joi.string().max(255).required().required(),
    amount: Joi.number().min(1).max(30).integer().required(),
    user_id: Joi.string().max(255).required().required(),
    category_name: Joi.string().max(255).required().required(),
  },
};

// - Get reservation by id
const getReservationById = async (ctx) => {
  ctx.body = await reservationService.getById(ctx.params.id);
};
getReservationById.validationScheme = {
  params: {
    id: Joi.string().max(255).required(),
  },
};

// - Delete reservation by id
const deleteReservation = async (ctx) => {
  await reservationService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteReservation.validationScheme = {
  params: {
    id: Joi.string().max(255).required(),
  },
};

// ==== Exports ====

module.exports = (app) => {
  const router = new Router({ prefix: "/reservations" });
  router.get(
    "/",
    hasPermission(permissions.write),
    validate(getAllReservations),
    getAllReservations
  );
  router.post(
    "/",
    hasPermission(permissions.loggedIn),
    validate(createReservation),
    createReservation
  );
  router.get(
    "/:id",
    hasPermission(permissions.write),
    validate(getReservationById),
    getReservationById
  );
  router.delete(
    "/:id",
    hasPermission(permissions.read),
    validate(deleteReservation),
    deleteReservation
  );
  app.use(router.routes());
};
