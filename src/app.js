const properties       = require('properties')(process.env.NODE_ENV),
      express          = require('express'),
      routerController = require('./routes/routerController');
    
let app = express();
app.use(`/${properties.server_path}`, routerController);

module.exports = app;