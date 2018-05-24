import { get } from './request';

const TYPE_CAPTURE = 'capture';
const TYPE_PROTOCOL_LOGO = 'protocol_logo';
const TYPE_IM = 'instructional_meduim';

let credentials = {};

credentials[TYPE_CAPTURE] = null;
credentials[TYPE_PROTOCOL_LOGO] = null;
credentials[TYPE_IM] = null;

const getCredentialsFor = (type, callback) => {
  if (credentials[type] !== null) {
    return credentials[type];
  }

  let path = '';

  switch (type) {
    case TYPE_IM:
      path = '/instructional_media/new';
      break;
    case TYPE_PROTOCOL_LOGO:
      path = '/protocols/new';
      break;
    default: // Captures
      path = '/patients/fake_patient_id/proofs/fake_proof_id/captures/new';
  }

  get(path)
    .then((response) => {
      if (response.status !== 200) { return; }
      credentials[type] = response.data;
      callback();
    });

  return null;
};

// Naive one, needs to be changed
const guessMimeType = (filename) => {
  var ext = filename.split('.').pop();

  switch (ext.toLowerCase()) {
    case 'mpg':
    case 'mpeg':
      return 'video/mpeg';
    case 'mov':
      return 'video/quicktime';
    case 'mp4':
      return 'video/mp4';
    case 'm4v':
      return 'video/m4v';
    case '3gp':
      return 'video/3gp';
    case 'avi':
      return 'video/avi';
    case 'wmv':
      return 'video/x-ms-wmv';
    case 'png':
      return 'image/png';
    default:
      return 'image/jpg';
  }
};

const upload = (type, file, opts = {}) => {
  console.log('Upload!!!');
  let
    formData = new FormData(),
    xhr = new XMLHttpRequest();

  // If creds is not loaded yet, then schedule function execution after
  let creds = getCredentialsFor(type, () => { upload(type, file, opts); });

  if (creds === null) { return ''; }

  creds.key = creds.key.replace('{extension}', file.name.split('.').pop());

  formData.append('utf8', '✓');
  formData.append('x-amz-server-side-encryption', 'AES256');
  formData.append('key', creds.key);
  formData.append('acl', creds.acl);
  formData.append('AWSAccessKeyId', creds.AWSAccessKeyId);
  formData.append('policy', creds.policy);
  formData.append('signature', creds.signature);
  formData.append('success_action_status', creds.success_action_status);
  formData.append('X-Requested-With', 'xhr');
  formData.append('content-type', guessMimeType(file.name));
  formData.append('file', file);

  xhr.open('POST', creds.action_url);

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable &&
        typeof opts.progress === 'function') {

      opts.progress(event.loaded, event.total);
    };
  });

  xhr.onloadstart = (e) => {
    if (typeof opts.start === 'function') {
      opts.start(e);
    }
  };

  xhr.onloadend = (e) => {
    if (typeof opts.success === 'function') {
      opts.success(creds.key, e);
    }
  };

  xhr.onerror = (e) => {
    if (typeof opts.error === 'function') {
      opts.error(e);
    }
  };

  xhr.send(formData);

  return creds.key;
};

const capture = (file, opts = {}) => { upload(TYPE_CAPTURE, file); };
const protocolLogo = (file, opts = {}) => { upload(TYPE_PROTOCOL_LOGO, file); };
const instructionalMedium = (file, opts = {}) => { upload(TYPE_IM, file); };

export default {
  capture,
  protocolLogo,
  instructionalMedium
};
