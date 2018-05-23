import session from './resources/session';
import proofs from './resources/proofs';
import patients from './resources/patients';

import CurrentUser from './current_user';
import Auth from './auth';

const login = (email, password, opts = {}) => {
  return session.create(email, password)
    .then((response) => {
      console.log('Response ', response);
      if (response.status === 200) {
        Auth.setToken(response.data.token);

        if (response.data.hasOwnProperty('clinician')) {
          CurrentUser.setCurrentUser(response.data.clinician);
        };

        if (response.data.hasOwnProperty('patient')) {
          CurrentUser.setCurrentUser(response.data.patient);
        };
      }
    });
};

const logout = (opts = {}) => {
  return session.destroy();
};

export default {
  login,
  logout,
  Auth,
  currentUser: {
    user: CurrentUser.user,
    isPatient: CurrentUser.isPatient,
    isClinician: CurrentUser.isClinician,
    isAuthenticated: CurrentUser.isAuthenticated
  },
  resources: {
    proofs,
    patients
  }
};

