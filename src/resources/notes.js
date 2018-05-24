import { post } from '../request';

const url = (patientID, proofID) =>
  '/patients/' + patientID + '/proofs/' + proofID + '/notes';

/* eslint-disable camelcase */
const prepareEntity = (note) => {
  return {
    body: note.body,
    only_visible_to_clinicians: note.only_visible_to_clinicians
  };
};
/* eslint-enable camelcase */

const create = (patientID, proofID, note, opts = {}) => {
  return post(url(patientID, proofID), prepareEntity(note));
};

export default { create };
