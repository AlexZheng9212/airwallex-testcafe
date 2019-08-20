/* eslint-disable import/no-unresolved */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import { authentication } from './api/authentication';
import { backdoor } from './api/backdoor';
import { signup } from './api/signup';
import { user } from './api/user';
import wallet from './api/wallet';

// const DEFAULT_HEADERD = { 'Content-Type': 'application/json' };

export const createInternalApi = () => {
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json' },
  });

  return {
    init: baseUrl => (instance.defaults.baseURL = baseUrl),
    authentication: authentication(instance),
    signup: signup(instance),
    user: user(instance),
    backdoor: backdoor(instance),
    wallet: wallet(instance),
    interceptors: instance.interceptors,
  };
};
