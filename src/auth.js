let authToken = null;

const setToken = (_token) => { authToken = _token; };
const isAuthenticated = () => { authToken === null; };
const token = () => { return authToken; };

export default {
  isAuthenticated,
  token,
  setToken
};
