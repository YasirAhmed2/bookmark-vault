/**
 * Creates and saves a new user.
 *
 * @async
 * @param {Object} params - username, email, password.
 * @returns {Promise<Object>} The created user.
 * also find a user by email.
 */
import { User } from "./user.mongo.js";

// export const createUser = (data) => {
//     User.create(data);
// }

export const createUser = async ({ username, email, password }) => {
  const user = new User({ username, email, password });
  return await user.save(); 
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

