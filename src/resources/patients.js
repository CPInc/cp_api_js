import Request from '../request';
import CurrentUser from '../current_user';

const basePath = '/patients';

const list = () => {
  if (!CurrentUser.isAuthenticated()) {
    return Request.unauthorizedPromise();
  };

  if (CurrentUser.isPatient()) {
    console.error('Error: this call is not allowed for patient.');
    return [];
  }

  return Request.get(basePath);
};

const get = (patientID) => {
  if (!CurrentUser.isAuthenticated()) {
    return Request.unauthorizedPromise();
  };

  if (CurrentUser.isPatient()) {
    console.error('Error: this call is not allowed for patient.');
    return [];
  }

  return Request.get(basePath + patientID);
};

export default {
  list,
  get
};
