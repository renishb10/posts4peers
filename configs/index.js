// Module dependency.
const dotEnv = require('dotenv');
const path = require('path');
const argParser = require('argv-parser');

const cmdLineArgs = argParser.parse(process.argv, { rules: {} }).parsed;

const envName = process.env.envName || cmdLineArgs.env || 'default';

// Application Environment files.
dotEnv.config({
  path: path.join(__dirname, `${envName}.env`),
});

// Application config goes here.
const config = {
  port: parseInt(process.env.SERVER_PORT, 10),
  logLevel: process.env.WINSTON_LOG_LEVEL,
  db: {
    url: process.env.DB_URL,
    options: { useNewUrlParser: true },
  },
  apiBasePath: '/api/v1',
};

if (envName === 'prod') {
  config.db.options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 5,
    keepAlive: 1,
    connectTimeoutMS: 5000,
    autoReconnect: true,
    connectWithNoPrimary: true,
    replicaSet: 'MainRepSet',
    readPreference: 'nearest',
    w: 'majority',
    j: 1,
    wtimeout: 10000,
    auth: {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
    },
  };
}

module.exports = config;