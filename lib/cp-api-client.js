window["CPApiClient"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = __webpack_require__(5);

var _auth = __webpack_require__(1);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestHeaders = function requestHeaders() {
  var headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('X-API-Session', _auth2.default.token());

  return headers;
};

var fullURL = function fullURL(path) {
  var urlParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var url = _config.baseURL + path;
  var paramsString = Object.keys(urlParams).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(urlParams[key]);
  }).join('&');

  return paramsString.length === 0 ? url : url + '?' + paramsString;
};

// Public

var handleUnauthenticated = function handleUnauthenticated(response) {
  if (response.status === 401) {
    throw new Error('unauthenticated');
  }
  return new Promise(function (resolve) {
    resolve(response);
  });
};

// opts:
//   urlParams - params for url
//   postData - post data to send
var request = function request(method, path) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var body = JSON.stringify(opts.postData);
  var status = 0;

  return fetch(fullURL(path, opts.urlParams), {
    method: method,
    headers: requestHeaders(),
    credentials: 'same-origin',
    body: body
  }).then(function (response) {
    status = response.status;
    return response.json();
  }).then(function (data) {
    return new Promise(function (resolve) {
      resolve({ status: status, data: data });
    });
  });
};

var get = function get(path) {
  var urlParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return request('get', path, _extends({ urlParams: urlParams }, opts));
};

var post = function post(path) {
  var postData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return request('post', path, _extends({ postData: postData }, opts));
};

var destroy = function destroy(path) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return request('delete', path, opts);
};

exports.default = {
  handleUnauthenticated: handleUnauthenticated,
  request: request,
  get: get,
  post: post,
  destroy: destroy
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var authToken = null;

var setToken = function setToken(_token) {
  authToken = _token;
};
var isAuthenticated = function isAuthenticated() {
  authToken === null;
};
var token = function token() {
  return authToken;
};

exports.default = {
  isAuthenticated: isAuthenticated,
  token: token,
  setToken: setToken
};
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var loggedUser = null;

var isAuthenticated = function isAuthenticated() {
  return loggedUser === null;
};
var isClinician = function isClinician() {
  return loggedUser.hasOwnProperty('specialty');
};
var isPatient = function isPatient() {
  return !isClinician();
};
var setCurrentUser = function setCurrentUser(currentUser) {
  loggedUser = Object.assign({}, currentUser);
};
var user = function user() {
  return loggedUser;
};

exports.default = {
  user: user,
  setCurrentUser: setCurrentUser,
  isAuthenticated: isAuthenticated,
  isClinician: isClinician,
  isPatient: isPatient
};
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _session = __webpack_require__(4);

var _session2 = _interopRequireDefault(_session);

var _proofs = __webpack_require__(6);

var _proofs2 = _interopRequireDefault(_proofs);

var _patients = __webpack_require__(7);

var _patients2 = _interopRequireDefault(_patients);

var _captures = __webpack_require__(8);

var _captures2 = _interopRequireDefault(_captures);

var _notes = __webpack_require__(9);

var _notes2 = _interopRequireDefault(_notes);

var _upload = __webpack_require__(10);

var _upload2 = _interopRequireDefault(_upload);

var _current_user = __webpack_require__(2);

var _current_user2 = _interopRequireDefault(_current_user);

var _auth = __webpack_require__(1);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = function login(email, password) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return _session2.default.create(email, password).then(function (response) {
    console.log('Response ', response);
    if (response.status === 200) {
      _auth2.default.setToken(response.data.token);

      if (response.data.hasOwnProperty('clinician')) {
        _current_user2.default.setCurrentUser(response.data.clinician);
      };

      if (response.data.hasOwnProperty('patient')) {
        _current_user2.default.setCurrentUser(response.data.patient);
      };
    }
  });
};

var logout = function logout() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return _session2.default.destroy();
};

exports.default = {
  login: login,
  logout: logout,
  isAuthenticated: _current_user2.default.isAuthenticated,
  currentUser: {
    user: _current_user2.default.user,
    isPatient: _current_user2.default.isPatient,
    isClinician: _current_user2.default.isClinician
  },
  upload: _upload2.default,
  resources: {
    proofs: _proofs2.default,
    patients: _patients2.default,
    notes: _notes2.default,
    captures: _captures2.default
  }
};
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(0);

var _request2 = _interopRequireDefault(_request);

var _auth = __webpack_require__(1);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authPath = '/sessions';

var create = function create(email, password) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return _request2.default.post(authPath, {
    email: email,
    password: password,
    'app_id': 'captureproof api'
  });
};

var destroy = function destroy() {
  return _request2.default.destroy(authPath + '/' + _auth2.default.token());
};

exports.default = {
  create: create,
  destroy: destroy
};
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  baseURL: 'http://captureproof.makstep.ru/api/v1',
  storage: 'mem' // mem (default), localstorage, cookie
};
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _current_user = __webpack_require__(2);

var _current_user2 = _interopRequireDefault(_current_user);

var _request = __webpack_require__(0);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basePath = function basePath(patientID, path) {
  return '/patients/' + patientID + '/proofs';
};

var urlParams = function urlParams() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return opts.hasOwnProperty('short') && opts.short ? {} : { include: opts.include ? opts.include : 'captures,notes,surveys,proof_surveys' };
};

// Path: /patients/<patien_id>/proofs
var list = function list() {
  var patientID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (_current_user2.default.isClinician()) {
    console.error('Error: this call only allowed for patient.');
    return [];
  }

  if (patientID === null && _current_user2.default.isPatient()) {
    patientID = _current_user2.default.user().id;
  }

  if (_current_user2.default.isPatient() && _current_user2.default.user().id !== patientID) {
    console.error('Error: unable to get proof list for other patient');
    return [];
  }

  return _request2.default.get(basePath(patientID), urlParams());
};

// Path: /patients/<patien_id>/proofs/<proof_id>
var get = function get(proofID) {
  var patientID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (patientID === null) {
    if (_current_user2.default.isClinician()) {
      console.error('Error: no patientID provided.');
      return [];
    }
    patientID = _current_user2.default.user().id;
  }

  return _request2.default.get(basePath(patientID) + '/' + proofID, urlParams());
};

exports.default = {
  list: list,
  get: get
};
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(0);

var _request2 = _interopRequireDefault(_request);

var _current_user = __webpack_require__(2);

var _current_user2 = _interopRequireDefault(_current_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basePath = '/patients';

var list = function list() {
  if (_current_user2.default.isPatient()) {
    console.error('Error: this call is not allowed for patient.');
    return [];
  }

  return _request2.default.get(basePath);
};

var get = function get(patientID) {
  if (_current_user2.default.isPatient()) {
    console.error('Error: this call is not allowed for patient.');
    return [];
  }

  return _request2.default.get(basePath + patientID);
};

exports.default = {
  list: list,
  get: get
};
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(0);

var basePath = function basePath(patientID, proofID) {
  return '/patients/' + patientID + '/proofs/' + proofID + '/captures';
};

/* eslint-disable camelcase */
var prepareEntity = function prepareEntity(capture) {
  var description = capture.description,
      upload_s3_key = capture.upload_s3_key,
      library_item_id = capture.library_item_id,
      media = capture.media,
      camera_type = capture.camera_type,
      metadata = capture.metadata;


  return {
    description: description,
    upload_s3_key: upload_s3_key,
    library_item_id: library_item_id,
    media: media,
    camera_type: camera_type,
    metadata: metadata
  };
};
/* eslint-enable camelcase */

var create = function create(patientID, proofID, capture) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return (0, _request.post)(basePath(patientID, proofID, prepareEntity(capture)));
};

exports.default = { create: create };
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(0);

var url = function url(patientID, proofID) {
  return '/patients/' + patientID + '/proofs/' + proofID + '/notes';
};

/* eslint-disable camelcase */
var prepareEntity = function prepareEntity(note) {
  return {
    body: note.body,
    only_visible_to_clinicians: note.only_visible_to_clinicians
  };
};
/* eslint-enable camelcase */

var create = function create(patientID, proofID, note) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return (0, _request.post)(url(patientID, proofID), prepareEntity(note));
};

exports.default = { create: create };
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(0);

var TYPE_CAPTURE = 'capture';
var TYPE_PROTOCOL_LOGO = 'protocol_logo';
var TYPE_IM = 'instructional_meduim';

var credentials = {};

credentials[TYPE_CAPTURE] = null;
credentials[TYPE_PROTOCOL_LOGO] = null;
credentials[TYPE_IM] = null;

var getCredentialsFor = function getCredentialsFor(type, callback) {
  if (credentials[type] !== null) {
    return credentials[type];
  }

  var path = '';

  switch (type) {
    case TYPE_IM:
      path = '/instructional_media/new';
      break;
    case TYPE_PROTOCOL_LOGO:
      path = '/protocols/new';
      break;
    default:
      // Captures
      path = '/patients/fake_patient_id/proofs/fake_proof_id/captures/new';
  }

  (0, _request.get)(path).then(function (response) {
    if (response.status !== 200) {
      return;
    }
    credentials[type] = response.data;
    callback();
  });

  return null;
};

// Naive one, needs to be changed
var guessMimeType = function guessMimeType(filename) {
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

var upload = function upload(type, file) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  console.log('Upload!!!');
  var formData = new FormData(),
      xhr = new XMLHttpRequest();

  // If creds is not loaded yet, then schedule function execution after
  var creds = getCredentialsFor(type, function () {
    upload(type, file, opts);
  });

  if (creds === null) {
    return '';
  }

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

  xhr.upload.addEventListener('progress', function (event) {
    if (event.lengthComputable && typeof opts.progress === 'function') {

      opts.progress(event.loaded, event.total);
    };
  });

  xhr.onloadstart = function (e) {
    if (typeof opts.start === 'function') {
      opts.start(e);
    }
  };

  xhr.onloadend = function (e) {
    if (typeof opts.success === 'function') {
      opts.success(creds.key, e);
    }
  };

  xhr.onerror = function (e) {
    if (typeof opts.error === 'function') {
      opts.error(e);
    }
  };

  xhr.send(formData);

  return creds.key;
};

var capture = function capture(file) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  upload(TYPE_CAPTURE, file);
};
var protocolLogo = function protocolLogo(file) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  upload(TYPE_PROTOCOL_LOGO, file);
};
var instructionalMedium = function instructionalMedium(file) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  upload(TYPE_IM, file);
};

exports.default = {
  capture: capture,
  protocolLogo: protocolLogo,
  instructionalMedium: instructionalMedium
};
module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=cp-api-client.js.map