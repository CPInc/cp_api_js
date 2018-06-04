import { post } from '../request';

const basePath = (patientID, proofID) => {
  return '/patients/' + patientID + '/proofs/' + proofID + '/captures';
};

/* eslint-disable camelcase */
const prepareEntity = (capture) => {
  const {
    description,
    upload_s3_key,
    library_item_id,
    media,
    camera_type,
    metadata } = capture;

  return {
    description,
    upload_s3_key,
    library_item_id,
    media,
    camera_type,
    metadata
  };
};
/* eslint-enable camelcase */

const create = (patientID, proofID, capture, opts = {}) => {
  return post(basePath(patientID, proofID), prepareEntity(capture));
};

export default { create };
