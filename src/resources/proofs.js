import CurrentUser from '../current_user';
import Request from '../request';

const basePath = (patientID, path) => { return '/patients/' + patientID + '/proofs'; };

const urlParams = (opts = {}) => {
  return (opts.hasOwnProperty('short') && opts.short) ?
    {} :
    { include: opts.include ? opts.include : 'captures,notes,surveys,proof_surveys' };
};

// Path: /patients/<patien_id>/proofs
const list = (patientID = null, opts = {}) => {
  if (!CurrentUser.isAuthenticated()) {
    return Request.unauthorizedPromise();
  };

  if (patientID === null && CurrentUser.isPatient()) {
    patientID = CurrentUser.user().id;
  }

  if (CurrentUser.isPatient() && CurrentUser.user().id !== patientID) {
    console.error('Error: unable to get proof list for other patient');
    return [];
  }

  return Request.get(basePath(patientID), urlParams());
};

// Path: /patients/<patien_id>/proofs/<proof_id>
const get = (patientID, proofID) => {
  if (!CurrentUser.isAuthenticated()) {
    return Request.unauthorizedPromise();
  };

  if (patientID === null) {
    if (CurrentUser.isClinician()) {
      console.error('Error: no patientID provided.');
      return [];
    }
    patientID = CurrentUser.user().id;
  }

  return Request.get(basePath(patientID) + '/' + proofID, urlParams());
};

export default {
  list,
  get
};
