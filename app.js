const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Custom dependency.
const config = require('./configs');
const routes = require('./routes');
global.logger = require('./helpers/logger').createCustLogger();
global.db = global.db ? global.db : require('./data/db')();
const auth = require('./middlewares/auth');

const app = express();

// Application middlewares.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json
app.use(helmet.hidePoweredBy()); // Helmet helps you secure our application.
app.use('/', express.static(path.join(__dirname, 'client')));
app.use(express.static('public'));

// Security middlewares
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Invoke authentication
app.use(auth.initialize());

// Swagger Documentation
app.use(
  '/api-doc',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }),
);

// Routing middlewares
app.use('/', routes.index);
app.use(`${config.apiBasePath}/posts`, routes.posts);
app.use(`${config.apiBasePath}/users`, routes.users);
app.use(`${config.apiBasePath}/tags`, routes.tags);

// Listener
app.listen(process.env.PORT || config.port, () => {
  logger.log('debug', `Listening on port ${config.port}...`);
});

// Exporting it for unit test
module.exports = app;

// TODO: Add module 'express-load' to chain-up & load middlewares, routes, services etc later
// TODO: Add third party log store via winston & exceptions (eg: Rollbar, Sentry.io or Azure AppInsights)
