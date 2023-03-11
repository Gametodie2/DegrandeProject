// ============== REST Validation ==============
// - REST validation

// ===== Imports =====

// - Import Joi
const Joi = require("joi");

// ===== JOI_OPTIONS =====
const JOI_OPTIONS = {
  abortEarly: true,
  allowUnknown: false,
  context: true,
  convert: true,
  presence: "required",
};

// ===== Functions =====

// - Cleanup Joi error
const cleanupJoiError = (error) =>
  error.details.reduce((resultObj, { message, path, type }) => {
    const joinedPath = path.join(".") || "value";
    if (!resultObj[joinedPath]) {
      resultObj[joinedPath] = [];
    }
    resultObj[joinedPath].push({
      type,
      message,
    });

    return resultObj;
  }, {});

// - Validate
const validate = (schema) => {
  if (!schema) {
    schema = {
      query: {},
      body: {},
      params: {},
    };
  }

  return (ctx, next) => {
    const errors = {};
    if (schema.query) {
      if (!Joi.isSchema(schema.query)) {
        schema.query = Joi.object(schema.query);
      }

      const { error: queryErrors, value: queryValue } = schema.query.validate(
        ctx.query,
        JOI_OPTIONS
      );

      if (queryErrors) {
        errors.query = cleanupJoiError(queryErrors);
      } else {
        ctx.query = queryValue;
      }
    }

    if (schema.body) {
      if (!Joi.isSchema(schema.body)) {
        schema.body = Joi.object(schema.body);
      }

      const { error: bodyErrors, value: bodyValue } = schema.body.validate(
        ctx.request.body,
        JOI_OPTIONS
      );

      if (bodyErrors) {
        errors.body = cleanupJoiError(bodyErrors);
      } else {
        ctx.request.body = bodyValue;
      }
    }

    if (schema.params) {
      if (!Joi.isSchema(schema.params)) {
        schema.params = Joi.object(schema.params);
      }

      const { error: paramsErrors, value: paramsValue } =
        schema.params.validate(ctx.params, JOI_OPTIONS);

      if (paramsErrors) {
        errors.params = cleanupJoiError(paramsErrors);
      } else {
        ctx.params = paramsValue;
      }
    }

    if (Object.keys(errors).length) {
      ctx.throw(400, "Validation failed, check details for more information", {
        code: "VALIDATION_FAILED",
        details: errors,
      });
    }

    return next();
  };
};

// ===== Exports =====

module.exports = validate;
