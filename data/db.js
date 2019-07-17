/**
  * @name DB
  * @description Creates an instance of DB connection
  * @returns {Object} Mongoose Database handle
*/

// Load the config file and mongoose library
const mongoose = require('mongoose');
const { db: dbConfig } = require('../configs');

// Export the mongoose instance
module.exports = () => {
  let mongo = null;
  mongoose.Promise = global.Promise;

  try {
    mongo = mongoose.connect(dbConfig.url, dbConfig.options)
      .then(() => logger.log('info', 'Database: Connection established successfully'), err => console.log(err, options));

    mongoose.connection.on('connected', () => {
      logger.log('info', 'Database: Connection opened');
    });

    mongoose.connection.on('error', (err) => {
      // logger.log('error',  'Couldn't able to connect to MongoDB', err);
      // Blow system on db error
      logger.log('info', 'Database: Error in establishing connection');
      throw err;
    });
  } catch (e) {
    // console.log('Couldn\'t connect to the Database:', e);
  }

  return mongoose;
};
