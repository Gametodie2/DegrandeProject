// =========== REST Index ===========

// ==== Imports ====

// - Import router
const Router = require("@koa/router");

// - Import routers
const installCategoryRouter = require("./_category");
const installUserRouter = require("./_user");
const installRoleRouter = require("./_role");
const installReservationRouter = require("./_reservation");

// ==== Exports ====

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installCategoryRouter(router);
  installUserRouter(router);
  installRoleRouter(router);
  installReservationRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
