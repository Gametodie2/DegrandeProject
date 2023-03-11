// ============== User Service ==============
// - Service for user related operations

// === Imports ===

// - Import uuid
const { v4: uuidv4 } = require("uuid");

// - Import service error
const ServiceError = require("../core/serviceError");
// - Import logger
const { getLogger } = require("../core/logging");
// - Import repository
const userRepository = require("../respository/user");

// === Functions ===

// - Debug log function
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

// - Create a new user
const create = ({ role_id, auth0_id }) => {
  debugLog("Creating a new user", {
    role_id,
  });
  const newUser = {
    id: uuidv4(),
    auth0_id: auth0_id,
    role_id: role_id,
  };
  return userRepository.create(newUser);
};

// - get all users
const getAll = async () => {
  debugLog("Fetching all users");
  const data = await userRepository.findAll();
  const totalCount = await userRepository.findCount();
  return {
    data,
    count: totalCount,
  };
};

// - get user by id
const getById = async (id) => {
  debugLog(`Fetching user with id ${id}`);
  const user = await userRepository.findById(id);

  if (!user) {
    throw ServiceError.notFound(`No user with id ${id} exists`, {
      id,
    });
  }

  return user;
};

// - get user by auth0 id
const getByAuth0Id = async (auth0id) => {
  debugLog(`Fetching user with auth0id ${auth0id}`);
  const user = await userRepository.findByAuth0Id(auth0id);

  if (!user) {
    const logger = getLogger();
    logger.info("No user with auth0id " + auth0id + " exists");
    throw ServiceError.notFound(`No user with id ${auth0id} exists`, {
      auth0id,
    });
  }

  return user;
};

// - update user
const updateById = async (id, { role_id }) => {
  debugLog(`Updating user with id ${id}`, {
    role_id,
  });
  return userRepository.update(id, { role_id });
};

// - delete user
const deleteById = async (id) => {
  debugLog(`Deleting user with id ${id}`);
  const deleted = await userRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.notFound(`No user with id ${id} exists`, {
      id,
    });
  }
};

// === Exports ===

module.exports = {
  create,
  getAll,
  getById,
  getByAuth0Id,
  updateById,
  deleteById,
};
