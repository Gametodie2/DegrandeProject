// ========== Role Repository ==========
// - Repository for role related operations

// - Import the data layer
const { tables, getKnex } = require("../data/index");
// - Import the logging layer
const { getLogger } = require("../core/logging");

// - Find all roles
const findAll = () => {
  return getKnex()(tables.role).select().orderBy("id", "ASC");
};

// - Find the count of roles
const findCount = async () => {
  const [count] = await getKnex()(tables.role).count();
  return count["count(*)"];
};

// - Find a role by id
const findById = (id) => {
  return getKnex()(tables.role).select().where("id", id).first();
};

// - Create a role
const create = ({ id, name }) => {
  try {
    const role = getKnex()(tables.role).insert({
      id,
      name,
    });
    return role;
  } catch (error) {
    throw new Error({ "Error in create": error });
  }
};

// - Update a role
const update = async (id, { name }) => {
  try {
    await getKnex()(tables.role)
      .update({
        name,
      })
      .where("id", id);

    return id;
  } catch (error) {
    throw new Error({ "Error in update": error });
  }
};

// - Delete a role
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.role).delete().where("id", id);
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
  update,
  deleteById,
};
