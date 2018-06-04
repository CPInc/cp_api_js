import { get } from './request';

const TYPE_CAPTURE = 'capture';
const TYPE_PROTOCOL_LOGO = 'protocol_logo';
const TYPE_IM = 'instructional_meduim';

let credentials = {};

credentials[TYPE_CAPTURE] = null;
credentials[TYPE_PROTOCOL_LOGO] = null;
credentials[TYPE_IM] = null;

// Generates uuid
const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
};

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
  let
    formData = new FormData(),
    xhr = new XMLHttpRequest();

  // If creds is not loaded yet, then schedule function execution after
  let creds = getCredentialsFor(type, () => { upload(type, file, opts); });

  if (creds === null) { return ''; }

  creds.key = creds.key.replace('{extension}', file.name.split('.').pop());
  creds.key = creds.key.replace('{uuid}', uuidv4());

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

  if (typeof opts.progress === 'function') {
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        opts.progress(event.loaded, event.total);
      };
    });
  }

  if (typeof opts.start === 'function') {
    xhr.onloadstart = opts.start;
  };

  if (typeof opts.success === 'function') {
    xhr.onloadend = (e) => {
      opts.success(creds.key, e);
    };
  };

  if (typeof opts.error === 'function') {
    xhr.onerror = opts.error;
  };

  xhr.send(formData);

  return creds.key;
};

const capture = (file, opts = {}) => { upload(TYPE_CAPTURE, file, opts); };
const protocolLogo = (file, opts = {}) => { upload(TYPE_PROTOCOL_LOGO, file, opts); };
const instructionalMedium = (file, opts = {}) => { upload(TYPE_IM, file, opts); };

export default {
  capture,
  protocolLogo,
  instructionalMedium
};
