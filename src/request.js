import { baseURL } from './config';
import Auth from './auth';

const requestHeaders = () => {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('X-API-Session', Auth.token());

  return headers;
};

const fullURL = (path, urlParams = {}) => {
  const url = baseURL + path;
  const paramsString = Object.keys(urlParams).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(urlParams[key]);
  }).join('&');

  return paramsString.length === 0 ? url : url + '?' + paramsString;
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

// opts:
//   urlParams - params for url
//   postData - post data to send
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

const get = (path, urlParams = {}, opts = {}) => {
  return request('get', path, { urlParams, ...opts });
};

const post = (path, postData = {}, opts = {}) => {
  return request('post', path, { postData, ...opts });
};

const destroy = (path, opts = {}) => {
  return request('delete', path, opts);
};

export default {
  handleUnauthenticated,
  request,
  get,
  post,
  destroy
};
