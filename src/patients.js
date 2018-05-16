import Request from './request';
import Auth, { isClinician } from './auth';

const basePath = '/patients/';

const all = () => {
  return Request.get(basePath);
};

const get = (patientID) => {
  if (Auth.isPatient) {
    return null;
  }

  return Request.get(basePath + patientID)
    .then(Request.handleJson);
};

const proofs = (patientID = null) => {
  if (patientID === null && Auth.isPatient) {
    patientID = Auth.user.id;
  }

  return Request.get(basePath + patientID + '/proofs/')
    .then(Request.handleJson);
};

const proof = (proofID, patientID = null) => {
  if (patientID === null) {
    if (isClinician) { return null; }
    patientID = Auth.user.id;
  }

  return Request.get(basePath + patientID + '/proofs/')
    .then(Request.handleJson);
};

export default {
  all,
  get,
  proofs,
  proof
};
