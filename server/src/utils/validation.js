/**
 * Validate registration input.
 *
 * Ensures the required fields for registering a user are present.
 *
 * @param {{ username?: string, email?: string, password?: string }} param0 - Destructured input object.
 * @param {string} [param0.username] - The username to register.
 * @param {string} [param0.email] - The user's email address.
 * @param {string} [param0.password] - The user's password.
 * @returns {boolean} True if all fields are provided (truthy), otherwise false.
 */
export const validateRegister = ({ username, email, password }) => {
  if (!username || !email || !password) {
    return false;
  }
  return true;
};

export const validateBookmark = ({ title, url }) => {
  if (!title || !url) {
    return false;
  }
  return true;
};
