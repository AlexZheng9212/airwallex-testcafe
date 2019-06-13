/* eslint-disable no-return-assign */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import axois from 'axios';
import { signup } from './api/signUp';
import { authentication } from './api/authentication';
import user from './api/user';

// const DEFAULT_HEADERD = { 'Content-Type': 'application/json' };

export const createExternalApi = () => {
  const instance = axois.create({
    headers: { 'Content-Type': 'application/json' },
  });

  return {
    init: baseUrl => (instance.defaults.baseURL = baseUrl),
    authentication: authentication(instance),
    signup: signup(instance),
    user: user(instance),
    interceptors: instance.interceptors,
  };
};
