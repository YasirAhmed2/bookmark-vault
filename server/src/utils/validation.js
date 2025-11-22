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
