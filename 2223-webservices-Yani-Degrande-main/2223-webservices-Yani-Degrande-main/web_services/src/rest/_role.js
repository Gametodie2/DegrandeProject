// =========== Role REST ===========
// - REST for role related operations

// ==== Imports ====

// - Import router
const Router = require("@koa/router");
// - Import Joi
const Joi = require("joi");

// - Import auth
const { hasPermission, permissions, addUserInfo } = require("../core/auth");
// - Import services
const roleService = require("../service/role");
const userService = require("../service/user");

// - Import validation
const validate = require("./_validation");

// ==== Functions ====

// - Get all roles
const getAllRoles = async (ctx) => {
  ctx.body = await roleService.getAll();
};
getAllRoles.validationScheme = null;

// - Get a role by id
const getRoleById = async (ctx) => {
  ctx.body = await roleService.getById(ctx.params.id);
};
getRoleById.validationScheme = {
  params: {
    id: Joi.string().max(255).required(),
  },
};

// - Create a role
const createRole = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    userId = await userService.create({
      auth0_id: ctx.state.user.sub,
      role_id: "37b7d86b-e11d-44eb-b55d-d8424336d2bc",
    });
  }

  const newRole = await roleService.create({
    ...ctx.request.body,
    userId,
  });
  ctx.body = newRole;
  ctx.status = 201;
};
createRole.validationScheme = {
  body: {
    name: Joi.string().max(255).required(),
  },
};

// - Update a role
const updateRole = async (ctx) => {
  ctx.body = await roleService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
};
updateRole.validationScheme = {
  params: {
    id: Joi.string().max(255).required(),
  },
  body: {
    name: Joi.string().max(255).required(),
  },
};

// - Delete a role
const deleteRole = async (ctx) => {
  await roleService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteRole.validationScheme = {
  params: {
    id: Joi.string().max(255).required(),
  },
};

// ==== Exports ====

module.exports = (app) => {
  const router = new Router({ prefix: "/roles" });
  router.get(
    "/",
    hasPermission(permissions.write),
    validate(getAllRoles),
    getAllRoles
  );
  router.post(
    "/",
    hasPermission(permissions.write),
    validate(createRole),
    createRole
  );
  router.get(
    "/:id",
    hasPermission(permissions.write),
    validate(getRoleById),
    getRoleById
  );
  router.put(
    "/:id",
    hasPermission(permissions.write),
    validate(updateRole),
    updateRole
  );
  router.delete(
    "/:id",
    hasPermission(permissions.write),
    validate(deleteRole),
    deleteRole
  );
  app.use(router.routes());
};
