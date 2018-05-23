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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(6);

var _auth = __webpack_require__(0);

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
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var url = _config.baseURL + path;
  var paramsString = Object.keys(params).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');

  return paramsString.length === 0 ? url : _config.baseURL + '?' + paramsString;
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

var get = function get(path, urlParams) {
  return request('get', path, { urlParams: urlParams });
};

var post = function post(path) {
  var postData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return request('post', path, { postData: postData });
};

var destroy = function destroy(path) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return request('delete', path);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(2);

var _request2 = _interopRequireDefault(_request);

var _current_user = __webpack_require__(1);

var _current_user2 = _interopRequireDefault(_current_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basePath = '/patients/';

var list = function list() {
  if (_current_user2.default.isPatient()) {
    console.log('Error: this call is not allowed for patient.');
    return [];
  }

  return _request2.default.get(basePath);
};

var get = function get(patientID) {
  if (_current_user2.default.isPatient()) {
    console.log('Error: this call is not allowed for patient.');
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _session = __webpack_require__(5);

var _session2 = _interopRequireDefault(_session);

var _proofs = __webpack_require__(7);

var _proofs2 = _interopRequireDefault(_proofs);

var _patients = __webpack_require__(3);

var _patients2 = _interopRequireDefault(_patients);

var _current_user = __webpack_require__(1);

var _current_user2 = _interopRequireDefault(_current_user);

var _auth = __webpack_require__(0);

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
  Auth: _auth2.default,
  currentUser: {
    user: _current_user2.default.user,
    isPatient: _current_user2.default.isPatient,
    isClinician: _current_user2.default.isClinician,
    isAuthenticated: _current_user2.default.isAuthenticated
  },
  resources: {
    proofs: _proofs2.default,
    patients: _patients2.default
  }
};
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(2);

var _request2 = _interopRequireDefault(_request);

var _auth = __webpack_require__(0);

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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _current_user = __webpack_require__(1);

var _current_user2 = _interopRequireDefault(_current_user);

var _request = __webpack_require__(2);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basePath = function basePath(patientID, path) {
  return '/patients/' + patientID + '/proofs';
};

var list = function list() {
  var patientID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (_current_user2.default.isClinician()) {
    console.log('Error: this call only allowed for patient.');
    return [];
  }

  if (patientID === null && _current_user2.default.isPatient()) {
    patientID = _current_user2.default.user.id;
  }

  if (_current_user2.default.isPatient() && _current_user2.default.user.id !== patientID) {
    console.log('Error: unable to get proof list for other patient');
    return [];
  }

  return _request2.default.get(basePath(patientID));
};

var get = function get(proofID) {
  var patientID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (patientID === null) {
    if (_current_user2.default.isClinician()) {
      console.log('Error: no patientID provided.');
      return [];
    }
    patientID = _current_user2.default.user.id;
  }

  return _request2.default.get(basePath(patientID) + '/' + proofID);
};

exports.default = {
  list: list,
  get: get
};
module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=cp-api-client.js.map