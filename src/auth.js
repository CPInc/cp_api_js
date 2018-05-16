import Request from './request';

const authPath = '/sessions';

class AuthData {
  constructor(authResponse) {
    if (authResponse.clinican) {
      this.userType = 'clinician';
      this.user = authResponse.clinician;
    } else {
      this.userType = 'patient';
      this.user = authResponse.patient;
    }
    this.token = authResponse.token;
  }

  get isAuthenticated() {
    return !!this.token;
  }

  get isClinician() {
    return this.userType === 'clinician';
  }

  get isPatient() {
    return this.userType === 'patient';
  }

};

let authData = null;

const isClinician = () => {
  return authData && authData.isClinician;
};

const isPatient = () => {
  return authData && authData.isPatient;
};

const user = () => {
  return authData;
};

const userType = () => {
  return authData.userType;
};

const authenticate = (email, password, opts = {}) => {
  return Request.post(authPath, {
    email,
    password,
    'app_id': 'captureproof api'
  })
    .then((response) => {
      if (response.status === 200) {
        Request.setAuthToken(response.data.token);
        authData = new AuthData(response.data);
      }

      return new Promise(resolve => {
        resolve(response);
      });
    })
    .catch((error) => {
      Request.setAuthToken('');
      authData = null;
      console.log('Fucked up: ', error);
    });
};

const isAuthenticated = () => {
  return authData && authData.isAuthenticated;
};

export default {
  authenticate,
  isClinician,
  isPatient,
  isAuthenticated,
  userType,
  user
};
