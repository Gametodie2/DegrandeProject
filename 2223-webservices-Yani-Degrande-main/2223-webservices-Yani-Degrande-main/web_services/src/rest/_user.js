// =========== User REST ===========
// - REST for user related operations

// ==== Imports ====

// - Import router
const Router = require("@koa/router");
// - Import Joi
const Joi = require("joi");

// - Import auth
const { hasPermission, permissions, addUserInfo } = require("../core/auth");
// - Import services
const userService = require("../service/user");

// - Import validation
const validate = require("./_validation");

// ==== Functions ====

// - Get all users
const getAllUsers = async (ctx) => {
  ctx.body = await userService.getAll();
};
getAllUsers.validationScheme = null;

// - Get a user by Auth0id
const getUserByAuth0Id = async (ctx) => {
  let auth0_id = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.params.id);
    auth0_id = user;
  } catch (err) {
    await addUserInfo(ctx);
    auth0_id = await userService.create({
      auth0_id: ctx.params.id,
      role_id: "ef6173b9-984b-4c86-a928-ff861db5abcb",
    });
  }
  ctx.body = auth0_id;
};
getUserByAuth0Id.validationScheme = {
  params: {
    id: Joi.string().max(255).required(),
  },
};

// - update a user
const updateUser = async (ctx) => {
  ctx.body = await userService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 200;
};
updateUser.validationScheme = {
  params: {
    id: Joi.string().max(255).required(),
  },
  body: {
    role_id: Joi.string().max(255).required(),
  },
};

// - delete a user
const deleteUser = async (ctx) => {
  ctx.body = await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteUser.validationScheme = {
  params: {
    id: Joi.string().max(255).required(),
  },
};

// ==== Exports ====

module.exports = (app) => {
  const router = new Router();
  router.get(
    "/",
    hasPermission(permissions.read),
    validate(getAllUsers),
    getAllUsers
  );
  router.get(
    "/:id",
    hasPermission(permissions.loggedIn),
    validate(getUserByAuth0Id),
    getUserByAuth0Id
  );
  router.put(
    "/:id",
    hasPermission(permissions.write),
    validate(updateUser),
    updateUser
  );
  router.delete(
    "/:id",
    hasPermission(permissions.write),
    validate(deleteUser),
    deleteUser
  );
  app.use("/users", router.routes());
};
