//  ============= Reservation Repository =============
// - Repository for reservation related operations

// - Import the data layer
const { tables, getKnex } = require("../data/index");
// - Import the logging layer
const { getLogger } = require("../core/logging");

// - Find all reservations
const findAll = () => {
  return getKnex()(tables.reservation).select().orderBy("id", "ASC");
};

// - Find the count of reservations
const findCount = async () => {
  const [count] = await getKnex()(tables.reservation).count();
  return count["count(*)"];
};

// - Find a reservation by id
const findById = (id) => {
  return getKnex()(tables.reservation).where("id", id).first();
};

// - Create a reservation
const create = async ({ id, date, amount, user_id, category_name }) => {
  try {
    const reservation = await getKnex()(tables.reservation).insert({
      id,
      date,
      amount,
      user_id,
      category_name,
    });
    return reservation;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

// - delete a reservation
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.reservation)
      .delete()
      .where("id", id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", {
      error,
    });
    throw error;
  }
};

// - Export the functions
module.exports = {
  findAll,
  findCount,
  findById,
  create,
  deleteById,
};
