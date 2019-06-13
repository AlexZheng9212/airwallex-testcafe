/* eslint-disable import/no-unresolved */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import axois from 'axios';

import authentication from './api/authentication';

// const DEFAULT_HEADERD = { 'Content-Type': 'application/json' };

export const createAirwallexApi = () => {
  const instance = axois.create({
    headers: { 'Content-Type': 'application/json' },
  });

  return {
    init: baseUrl => (instance.defaults.baseURL = baseUrl),
    authentication: authentication(instance),
    interceptors: instance.interceptors,
  };
};
