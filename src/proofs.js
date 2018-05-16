import Auth, { isPatient, isClinician } from './auth';
import Patient from './patients';

const all = (patientID = null) => {
  if (isClinician()) { return []; }
  if (isPatient() && Auth.user.id !== patientID) { return []; }

  return Patient.proofs(patientID);
};

const get = (proofID, patientID = null) => {
  if (patientID === null) {
    if (isClinician()) { return null; }
    patientID = Auth.user.id;
  }
  console.log('!!!!! ', patientID);
  return Patient.proof(proofID, patientID);
};

export default {
  all,
  get
};
