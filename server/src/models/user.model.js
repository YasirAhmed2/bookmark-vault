import { User } from "./user.mongo.js";

// export const createUser = (data) => {
//     User.create(data);
// }
export const createUser = async ({ username, email, password }) => {
  const user = new User({ username, email, password });
  return await user.save(); 
};

/**
 * Find a user document by email.
 *
 * @param {string} email - Email address of the user to look up.
 * @returns {Promise<Object|null>} Promise that resolves to the user document if found, or null if no user matches.
 */
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

