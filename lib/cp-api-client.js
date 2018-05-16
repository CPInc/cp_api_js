(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(1);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var authPath = '/sessions';

var AuthData = function () {
  function AuthData(authResponse) {
    _classCallCheck(this, AuthData);

    if (authResponse.clinican) {
      this.userType = 'clinician';
      this.user = authResponse.clinician;
    } else {
      this.userType = 'patient';
      this.user = authResponse.patient;
    }
    this.token = authResponse.token;
  }

  _createClass(AuthData, [{
    key: 'isAuthenticated',
    get: function get() {
      return !!this.token;
    }
  }, {
    key: 'isClinician',
    get: function get() {
      return this.userType === 'clinician';
    }
  }, {
    key: 'isPatient',
    get: function get() {
      return this.userType === 'patient';
    }
  }]);

  return AuthData;
}();

;

var authData = null;

var isClinician = function isClinician() {
  return authData && authData.isClinician;
};

var isPatient = function isPatient() {
  return authData && authData.isPatient;
};

var user = function user() {
  return authData;
};

var userType = function userType() {
  return authData.userType;
};

var authenticate = function authenticate(email, password) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return _request2.default.post(authPath, {
    email: email,
    password: password,
    'app_id': 'captureproof api'
  }).then(function (response) {
    if (response.status === 200) {
      _request2.default.setAuthToken(response.data.token);
      authData = new AuthData(response.data);
    }

    return new Promise(function (resolve) {
      resolve(response);
    });
  }).catch(function (error) {
    _request2.default.setAuthToken('');
    authData = null;
    console.log('Fucked up: ', error);
  });
};

var isAuthenticated = function isAuthenticated() {
  return authData && authData.isAuthenticated;
};

exports.default = {
  authenticate: authenticate,
  isClinician: isClinician,
  isPatient: isPatient,
  isAuthenticated: isAuthenticated,
  userType: userType,
  user: user
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(4);

var authToken = null;

var requestHeaders = function requestHeaders() {
  var headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('X-API-Session', authToken);

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

var setAuthToken = function setAuthToken(token) {
  authToken = token;
};

var handleJson = function handleJson(response) {
  return response.json();
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

exports.default = {
  setAuthToken: setAuthToken,
  handleJson: handleJson,
  handleUnauthenticated: handleUnauthenticated,
  request: request,
  get: get,
  post: post
};
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(1);

var _request2 = _interopRequireDefault(_request);

var _auth = __webpack_require__(0);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basePath = '/patients/';

var all = function all() {
  return _request2.default.get(basePath);
};

var get = function get(patientID) {
  if (_auth2.default.isPatient) {
    return null;
  }

  return _request2.default.get(basePath + patientID).then(_request2.default.handleJson);
};

var proofs = function proofs() {
  var patientID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (patientID === null && _auth2.default.isPatient) {
    patientID = _auth2.default.user.id;
  }

  return _request2.default.get(basePath + patientID + '/proofs/').then(_request2.default.handleJson);
};

var proof = function proof(proofID) {
  var patientID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (patientID === null) {
    if (_auth.isClinician) {
      return null;
    }
    patientID = _auth2.default.user.id;
  }

  return _request2.default.get(basePath + patientID + '/proofs/').then(_request2.default.handleJson);
};

exports.default = {
  all: all,
  get: get,
  proofs: proofs,
  proof: proof
};
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patient = exports.proof = exports.auth = undefined;

var _auth = __webpack_require__(0);

var _auth2 = _interopRequireDefault(_auth);

var _proofs = __webpack_require__(5);

var _proofs2 = _interopRequireDefault(_proofs);

var _patients = __webpack_require__(2);

var _patients2 = _interopRequireDefault(_patients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.auth = _auth2.default;
exports.proof = _proofs2.default;
exports.patient = _patients2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  baseURL: 'http://captureproof.makstep.ru/api/v1'
};
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = __webpack_require__(0);

var _auth2 = _interopRequireDefault(_auth);

var _patients = __webpack_require__(2);

var _patients2 = _interopRequireDefault(_patients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var all = function all() {
  var patientID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if ((0, _auth.isClinician)()) {
    return [];
  }
  if ((0, _auth.isPatient)() && _auth2.default.user.id !== patientID) {
    return [];
  }

  return _patients2.default.proofs(patientID);
};

var get = function get(proofID) {
  var patientID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (patientID === null) {
    if ((0, _auth.isClinician)()) {
      return null;
    }
    patientID = _auth2.default.user.id;
  }
  console.log('!!!!! ', patientID);
  return _patients2.default.proof(proofID, patientID);
};

exports.default = {
  all: all,
  get: get
};
module.exports = exports['default'];

/***/ })
/******/ ])));
//# sourceMappingURL=cp-api-client.js.map