const { createLogger, format, transports } = require('winston');
const config = require('../configs');

module.exports = {
  createCustLogger: () => createLogger({ // Initiate and return Winston Logger
    level: config.logLevel,
    format: format.json(),
    transports: [
      new transports.Console({
        format: format.simple(),
      }),
    ],
  }),
};
