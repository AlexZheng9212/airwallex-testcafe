/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import log4js from 'log4js';
import moment from 'moment';

log4js.configure({
  appenders: {
    console: {
      type: 'console',
    },
    date_file: {
      type: 'dateFile',
      filename: `${__dirname}/../../../reports/report${moment().format('_YYYYMMDD_HHmmss_x')}.log`,
      daysToKeep: 10,
      encoding: 'utf-8',

    },
  },
  categories: {
    default: { appenders: ['date_file'], level: 'debug' },
    console: { appenders: ['console'], level: 'debug' },
  },
});

module.exports = log4js.getLogger('default');
