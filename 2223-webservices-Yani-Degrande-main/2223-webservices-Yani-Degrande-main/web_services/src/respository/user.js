// ============= User Repository =============
// - Repository for user related operations

// - Import the data layer
const { tables, getKnex } = require("../data");
// - Import the logging layer
const { getLogger } = require("../core/logging");

// - Find all users
const findAll = () => {
  return getKnex()(tables.user).select().orderBy("id", "ASC");
};

// - Find the count of users
const findCount = async () => {
  const [count] = await getKnex()(tables.user).count();
  return count["count(*)"];
};

// - Find a user by id
const findById = (id) => {
  return getKnex()(tables.user).where("id", id).first();
};

// - Find a user by auth0 id
const findByAuth0Id = (auth0id) => {
  return getKnex()(tables.user).where("auth0_id", auth0id).first();
};

// - Create a user
const create = async ({ id, role_id, auth0_id }) => {
  try {
    const user = await getKnex()(tables.user).insert({
      id,
      role_id,
      auth0_id,
    });
    return user;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

// - Update a user
const update = async (id, { role_id, auth0_id }) => {
  try {
    await getKnex()(tables.user)
      .update({
        role_id,
        auth0_id,
      })
      .where("id", id);
    const user = await findById(id);
    return user;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in updateById", {
      error,
    });
    throw error;
  }
};

// - Delete a user
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.user).delete().where("id", id);
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
  findByAuth0Id,
  create,
  update,
  deleteById,
};
