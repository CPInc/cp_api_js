import { baseURL } from './config';

let authToken = null;

const requestHeaders = () => {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('X-API-Session', authToken);

  return headers;
};

const fullURL = (path, params = {}) => {
  const url = baseURL + path;
  const paramsString = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');

  return paramsString.length === 0 ? url : baseURL + '?' + paramsString;
};

// Public

const handleUnauthenticated = (response) => {
  if (response.status === 401) {
    throw new Error('unauthenticated');
  }
  return new Promise((resolve) => {
    resolve(response);
  });
};

const setAuthToken = (token) => {
  authToken = token;
};

const handleJson = (response) => {
  return response.json();
};

const request = (method, path, opts = {}) => {
  const body = JSON.stringify(opts.postData);
  let status = 0;

  return fetch(fullURL(path, opts.urlParams), {
    method: method,
    headers: requestHeaders(),
    credentials: 'same-origin',
    body
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      return new Promise((resolve) => {
        resolve({ status, data });
      });
    });
};

const get = (path, urlParams) => {
  return request('get', path, { urlParams });
};

const post = (path, postData = {}) => {
  return request('post', path, { postData });
};

export default {
  setAuthToken,
  handleJson,
  handleUnauthenticated,
  request,
  get,
  post
};
