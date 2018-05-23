import CurrentUser from '../current_user';
import Request from '../request';

const basePath = (patientID, path) => { return '/patients/' + patientID + '/proofs'; };

const list = (patientID = null) => {
  if (CurrentUser.isClinician()) {
    console.log('Error: this call only allowed for patient.');
    return [];
  }

  if (patientID === null && CurrentUser.isPatient()) {
    patientID = CurrentUser.user.id;
  }

  if (CurrentUser.isPatient() && CurrentUser.user.id !== patientID) {
    console.log('Error: unable to get proof list for other patient');
    return [];
  }

  return Request.get(basePath(patientID));
};

const get = (proofID, patientID = null) => {
  if (patientID === null) {
    if (CurrentUser.isClinician()) {
      console.log('Error: no patientID provided.');
      return [];
    }
    patientID = CurrentUser.user.id;
  }

  return Request.get(basePath(patientID) + '/' + proofID);
};

export default {
  list,
  get
};
