let clientConfig = {
  baseURL: 'http://captureproof.makstep.ru/api/v1',
  storage: 'mem' // mem (default), localstorage, cookie
};

const config = () => { return clientConfig; };

const setConfigParam = (paramName, value) => {
  clientConfig[paramName] = value;
  return clientConfig;
};

export default {
  config,
  setConfigParam
};
