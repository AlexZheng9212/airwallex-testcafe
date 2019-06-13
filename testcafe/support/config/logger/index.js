/* eslint-disable import/prefer-default-export */

import logger from './loggerConfig';

export const loggingHelping = {
  reqInterceptor: (req) => {
    logger.info(
      'Sending [%s] request to [%s], with payload:\n%s\nparams:\n%s\nheader:\n%s\n',
      req.method.toUpperCase(),
      req.url,
      JSON.stringify(req.data) || 'no request payload',
      JSON.stringify(req.params),
      JSON.stringify(req.headers),
    );
    return req;
  },
  resInterceptor: (res) => {
    logger.info(
      'Receive [%s] from [%s] url:\n[%s]\n with payload:\n[%s]\n',
      res.status,
      res.config.method.toUpperCase(),
      res.config.url,
      JSON.stringify(res.data || 'no request payload'),
    );
    return res;
  },
  errInterceptor: (err) => {
    logger.error(
      'Receive ERROR MESSAGE status ,\n url: [%s]\n payload: [%s]\n headers: [%s]\n params: [%s]\n',
      err.response.status,
      err.reponse.config,
      JSON.stringify(err.response.data),
      JSON.stringify(err.response.headers),
      JSON.stringify(err.response.params),
    );
  },
};
