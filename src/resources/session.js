import Request from '../request';
import Auth from '../auth';

const authPath = '/sessions';

const create = (email, password, opts = {}) => {
  return Request.post(authPath, {
    email,
    password,
    'app_id': 'captureproof api'
  });
};

const destroy = () => {
  return Request.destroy(authPath + '/' + Auth.token());
};

export default {
  create,
  destroy
};
