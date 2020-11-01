var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var constants = require('./api/util/constants');
var port = process.env.PORT || 8050;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);
app.use(bodyParser.json());


console.log('Declarando routing');
var routes = require(constants.ROUTE_UBICATION);
routes(app);
console.log('End all routing');

console.log('Creando server');
app.listen(port);
console.log('Aplicacion iniciada en el puerto: ' + port);
