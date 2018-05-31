import session from './resources/session';
import proofs from './resources/proofs';
import patients from './resources/patients';
import captures from './resources/captures';
import notes from './resources/notes';

import upload from './upload';

import config from './config';

import CurrentUser from './current_user';
import Auth from './auth';

const login = (email, password, opts = {}) => {
  return session.create(email, password)
    .then(response => {
      if (response.status === 200) {
        Auth.setToken(response.data.token);

        if (response.data.hasOwnProperty('clinician')) {
          CurrentUser.setCurrentUser(response.data.clinician);
        };

        if (response.data.hasOwnProperty('patient')) {
          CurrentUser.setCurrentUser(response.data.patient);
        };
      }
      return new Promise(resolve => { resolve(response); });
    });
};

const logout = (opts = {}) => {
  return session.destroy();
};

const setApiBaseURL = (url) => {
  config.setConfigParam('baseURL', url);
};

export default {
  setApiBaseURL,
  login,
  logout,
  isAuthenticated: CurrentUser.isAuthenticated,
  currentUser: {
    user: CurrentUser.user,
    isPatient: CurrentUser.isPatient,
    isClinician: CurrentUser.isClinician
  },
  upload,
  resources: {
    proofs,
    patients,
    notes,
    captures
  }
};

