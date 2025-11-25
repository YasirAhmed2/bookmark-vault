import { User } from "./user.mongo.js";

// export const createUser = (data) => {
//     User.create(data);
// }
/**
 * Create and persist a new user.
 *
 * @async
 * @param {Object} params - User creation parameters.
 * @param {string} params.username - The username for the new user.
 * @param {string} params.email - The email address for the new user.
 * @param {string} params.password - The password for the new user.
 * @returns {Promise<Object>} A promise that resolves to the saved User document.
 * @throws {Error} If validation fails or the database operation errors.
 */
export const createUser = async ({ username, email, password }) => {
  const user = new User({ username, email, password });
  return await user.save(); 
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

