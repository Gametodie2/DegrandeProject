// ============== Category Service ==============
// - Service for category related operations

// === Imports ===

// - Import service error
const ServiceError = require("../core/serviceError");
// - Import logger
const { getLogger } = require("../core/logging");
// - Import repository
const categoriesRepository = require("../respository/category");

// === Functions ===

// - Debug log function
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

// - Get all categories
const getAll = async () => {
  const items = await categoriesRepository.findAll();
  const count = await categoriesRepository.findCount();
  return {
    items,
    count,
  };
};

// - Get category by name
const getByName = async (name) => {
  debugLog(`Fetching category with name ${name}`);
  const category = await categoriesRepository.findByName(name);

  if (!category) {
    throw ServiceError.notFound(`No category with name ${name} exists`, {
      name,
    });
  }

  return category;
};

// - Create a new category
const create = async ({ name, price, duration }) => {
  debugLog("Creating a new category", {
    name,
    duration,
    price,
  });

  const newCategory = {
    name: name,
    price: price,
    duration: duration,
  };

  await categoriesRepository.create(newCategory);

  return newCategory;
};

// - Update category by name
const updateByName = async (name, { price, duration }) => {
  debugLog(`Updating category with name ${name}`, {
    price,
    duration,
  });

  await categoriesRepository.update(name, { price, duration });

  return await categoriesRepository.findByName(name);
};

// - Delete category by name
const deleteByName = async (name) => {
  debugLog(`Deleting category with name ${name}`);
  await categoriesRepository.deleteByName(name);
};

// === Exports ===

module.exports = {
  getAll,
  getByName,
  create,
  updateByName,
  deleteByName,
};
