// ============== Reservation Service ==============
// - Service for reservation related operations

// === Imports ===

// - Import uuid
const { v4: uuidv4 } = require("uuid");

// - Import service error
const ServiceError = require("../core/serviceError");
// - Import logger
const { getLogger } = require("../core/logging");
// - Import repository
const reservationsRepository = require("../respository/reservation");
const userRepository = require("../respository/user");
const categoryRepository = require("../respository/category");

// === Functions ===

// - Debug log function
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

// - get all reservations
const getAll = async () => {
  debugLog("Fetching all reservations");
  const items = await reservationsRepository.findAll();
  const count = await reservationsRepository.findCount();
  return {
    items,
    count,
  };
};

// - get reservation by id
const getById = async (id) => {
  debugLog(`Fetching reservation with id ${id}`);
  const reservation = await reservationsRepository.findById(id);

  if (!reservation) {
    throw ServiceError.notFound(`No reservation with id ${id} exists`, {
      id,
    });
  }

  return reservation;
};

// - Create a new reservation
const create = async ({ date, amount, user_id, category_name }) => {
  debugLog("Creating a new reservation", {
    date,
    amount,
    user_id,
    category_name,
  });

  const user = await userRepository.findById(user_id);
  if (!user) {
    throw ServiceError.notFound(`No user with id ${user_id} exists`, {
      user_id,
    });
  }

  const category = await categoryRepository.findByName(category_name);
  if (!category) {
    throw ServiceError.notFound(
      `No category with name ${category_name} exists`,
      {
        category_name,
      }
    );
  }
  return await reservationsRepository.create({
    id: uuidv4(),
    date: date,
    amount: amount,
    user_id: user_id,
    category_name: category_name,
  });
};

// - Delete reservation by id
const deleteById = async (id) => {
  debugLog(`Deleting reservation with id ${id}`);
  await reservationsRepository.deleteById(id);
};

// === Exports ===

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
};
