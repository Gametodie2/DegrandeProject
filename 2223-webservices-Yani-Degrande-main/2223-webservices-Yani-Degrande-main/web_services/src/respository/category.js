// =========== Category Repository ============
// - Repository for category related operations

// - Import the data layer
const { tables, getKnex } = require("../data/index");
// - Import the logging layer
const { getLogger } = require("../core/logging");

// - Find all categories
const findAll = () => {
  return getKnex()(tables.category).select().orderBy("name", "ASC");
};

// - Find the count of categories
const findCount = async () => {
  const [count] = await getKnex()(tables.category).count();
  return count["count(*)"];
};

// - Find a category by name
const findByName = (name) => {
  return getKnex()(tables.category).where("name", name).first();
};

// - Create a category
const create = (category) => {
  return getKnex()(tables.category).insert(category);
};

// - Update a category
const update = async (name, { duration, price }) => {
  try {
    await getKnex()(tables.category)
      .update({
        duration,
        price,
      })
      .where("name", name);

    return name;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in updateByName", {
      error,
    });
    throw error;
  }
};

// - Delete a category
const deleteByName = async (name) => {
  try {
    const rowsAffected = await getKnex()(tables.category)
      .delete()
      .where("name", name);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteByName", {
      error,
    });
    throw error;
  }
};

// - Export the functions
module.exports = {
  findAll,
  findCount,
  findByName,
  create,
  update,
  deleteByName,
};
