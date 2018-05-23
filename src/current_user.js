let loggedUser = null;

const isAuthenticated = () => { return loggedUser === null; };
const isClinician = () => { return loggedUser.hasOwnProperty('specialty'); };
const isPatient = () => { return !isClinician(); };
const setCurrentUser = (currentUser) => { loggedUser = Object.assign({}, currentUser); };
const user = () => { return loggedUser; };

export default {
  user,
  setCurrentUser,
  isAuthenticated,
  isClinician,
  isPatient
};
