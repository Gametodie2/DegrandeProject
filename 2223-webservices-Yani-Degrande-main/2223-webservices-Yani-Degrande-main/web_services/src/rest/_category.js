// =========== Category REST ===========
// - REST for category related operations

// ==== Imports ====

// - Import router
const Router = require("@koa/router");
// - Import Joi
const Joi = require("joi");

// - Import auth
const { hasPermission, permissions, addUserInfo } = require("../core/auth");
// - Import services
const categoryService = require("../service/category");
const userService = require("../service/user");
// - Import validation

const validate = require("./_validation");

// ==== Functions ====

// - Get all categories
const getAllCategories = async (ctx) => {
  ctx.body = await categoryService.getAll();
};
getAllCategories.validationScheme = null;

// - Create a category
const createCategory = async (ctx) => {
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
  const newCategory = await categoryService.create({
    ...ctx.request.body,
    userId,
  });
  ctx.body = newCategory;
  ctx.status = 201;
};
createCategory.validationScheme = {
  body: {
    name: Joi.string().max(255).required(),
    price: Joi.number().min(1).max(500).required(),
    duration: Joi.string().max(255).required(),
  },
};

// - Get a category by name
const getCategoryByName = async (ctx) => {
  ctx.body = await categoryService.getByName(ctx.params.name);
};
getCategoryByName.validationScheme = {
  params: {
    name: Joi.string().max(255).required(),
  },
};

// - Update a category by name
const updateCategory = async (ctx) => {
  ctx.body = await categoryService.updateByName(ctx.params.name, {
    ...ctx.request.body,
  });
};
updateCategory.validationScheme = {
  params: {
    name: Joi.string().max(255).required(),
  },
  body: {
    price: Joi.number().min(1).max(500),
    duration: Joi.string().max(255),
  },
};

// - Delete a category by name
const deleteCategory = async (ctx) => {
  ctx.body = await categoryService.deleteByName(ctx.params.name);
  ctx.status = 204;
};
deleteCategory.validationScheme = {
  params: {
    name: Joi.string().max(255).required(),
  },
};

// ==== Exports ====

module.exports = (app) => {
  const router = new Router({
    prefix: "/categories",
  });

  router.get(
    "/",
    hasPermission(permissions.loggedIn),
    validate(getAllCategories.validationScheme),
    getAllCategories
  );
  router.post(
    "/",
    hasPermission(permissions.write),
    validate(createCategory.validationScheme),
    createCategory
  );
  router.get(
    "/:name",
    hasPermission(permissions.read),
    validate(getCategoryByName.validationScheme),
    getCategoryByName
  );
  router.put(
    "/:name",
    hasPermission(permissions.write),
    validate(updateCategory.validationScheme),
    updateCategory
  );
  router.delete(
    "/:name",
    hasPermission(permissions.write),
    validate(deleteCategory.validationScheme),
    deleteCategory
  );

  app.use(router.routes()).use(router.allowedMethods());
};
