'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const cors = require('cors');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

const YAML = require('yamljs');
const ConfigResolver = require('./config/config-resolver');
const cfg = Object.assign(new ConfigResolver.ConfigSchema(), require('config'));

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
const swaggerUi = require('swagger-ui-express');

// swaggerDocument.host = `${cfg.HOSTNAME}:${cfg.resolvePort()}`;

app.use('/test/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = 8090;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/getName']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/getName?name=SarojPanda');
  }
});
