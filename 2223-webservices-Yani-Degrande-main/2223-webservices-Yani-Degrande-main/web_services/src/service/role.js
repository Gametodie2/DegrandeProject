// ============== Role Service ==============
// - Service for role related operations

// === Imports ===

// - Import uuid
const { v4: uuidv4 } = require("uuid");

// - Import service error
const ServiceError = require("../core/serviceError");
// - Import logger
const { getLogger } = require("../core/logging");
// - Import repository
const rolesRepository = require("../respository/role");

// === Functions ===

// - Debug log function
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

// - Get all roles
const getAll = async () => {
  debugLog("Fetching all roles");
  const items = await rolesRepository.findAll();
  const count = await rolesRepository.findCount();
  return {
    items,
    count,
  };
};

// - Get role by id
const getById = async (id) => {
  debugLog(`Fetching role with id ${id}`);
  const role = await rolesRepository.findById(id);

  if (!role) {
    throw ServiceError.notFound(`No role with id ${id} exists`, {
      id,
    });
  }

  return role;
};

// - Create a new role
const create = async ({ name }) => {
  debugLog("Creating a new role", {
    name,
  });

  const newRole = {
    id: uuidv4(),
    name,
  };

  await rolesRepository.create(newRole);
  return newRole;
};

// - Update role by id
const updateById = async (id, { name }) => {
  debugLog(`Updating role with id ${id}`, {
    name,
  });

  await rolesRepository.update(id, { name });

  return await rolesRepository.findById(id);
};

// - Delete role by id
const deleteById = async (id) => {
  debugLog(`Deleting role with id ${id}`);
  await rolesRepository.deleteById(id);
};

// === Exports ===

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
