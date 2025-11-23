import { User } from "./user.mongo.js";

export const createUser = (data) => {
    User.create(data);
}

/**
 * Find a user document by email.
 *
 * @param {string} email - Email address of the user to look up.
 * @returns {Promise<Object|null>} Promise that resolves to the user document if found, or null if no user matches.
 */
export const findUserByEmail = (email) => {
    User.findOne({ email });
}
