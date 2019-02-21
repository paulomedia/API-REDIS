const rtveLogger         = require('logger'),
      logger             = rtveLogger./*initialize('api-redis').*/getLogger('api-redis.server'),
      properties         = require('properties')(process.env.NODE_ENV),
      common             = require('module-common')('queryIsgdr'),
      content_middleware = require('module-content-negotiator').middleware,
      express            = require('express'),
      path               = require('path'),
      Url                = require('url'),
      bodyParser         = require('body-parser');

// Configuración para simular entorno de producción  (grunt pro)
const isDevMode = process.argv.slice(2)[0] === 'nobuild',
    baseFolder = isDevMode ? '.' : '../dist',
    buildTarget = isDevMode ? '/.tmp/merge' : '.';

let app = express();
const queryIsgdr = require(path.join(__dirname, baseFolder, 'app.js'));

if (process.env.newrelic) {
  app.locals.newrelic = require('newrelic');
}

app.use(queryIsgdr);
app.use(rtveLogger.getExpressLogger()); //configuracion del access log

app.use(common.middlewares.errorStatus, common.middlewares.errorRequest); // redirige errores
// formatea respuestas según lo que se envía
app.use(content_middleware.expressNegocaitor);
app.use(content_middleware.characterIsoEncoding);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(properties.nodePort, () => {
  logger.info(`Server listening http://localhost:${server.address().port}/${properties.server_path}/`);
});

process.on('uncaughtException', (err) => {
    const loggerException = rtveLogger.getLogger('rtve.mySuperPf.uncaughtException');
    loggerException.fatal('Uncaught Exception: ' + err.message);
    loggerException.fatal('stack trace: ' + err.stack);
    process.exit(1);
});

module.exports = app;