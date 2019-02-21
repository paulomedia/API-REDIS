const Logger         = require('logger'),
      logger             = Logger./*initialize('api-redis').*/getLogger('api-redis.testing'),
      properties         = require('properties')(process.env.NODE_ENV),
      common             = require('common')('api-redis'),
      content_middleware = require('content-negotiator').middleware,
      express            = require('express'),
      path               = require('path'),
      Url                = require('url'),
      request            = require('request');

// Configuración para simular entorno de producción  (grunt pro)
const isDevMode = process.argv.slice(2)[0] === 'nobuild',
  baseFolder = isDevMode ? '.' : '../dist',
  buildTarget = isDevMode ? '/.tmp/merge' : '.';

// CALLBACKS
const serve = () => {
  logger.info(`Server testing listening on: http://localhost:${server.address().port}/${properties.server_path}/`);
};

// Configuraciones iniciales
const appwrapper = express();
const queryIsgdr = require(path.join(__dirname, baseFolder, 'app.js'));

// MIDDLEWARE Y ROUTING
appwrapper
  .use(queryIsgdr)
  .use(Logger.getExpressLogger())//configuracion del access log //TODO
  .use(content_middleware.expressNegocaitor) // formatea respuestas según lo que se envía
  .use(content_middleware.characterIsoEncoding)
  .use(common.middlewares.errorStatus, common.middlewares.errorRequest);

const server = appwrapper.listen(properties.nodePort, serve);        // Lanza el servidor

module.exports = appwrapper;