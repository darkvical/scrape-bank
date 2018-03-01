var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var constants = require('./api/util/constants');
var port = process.env.PORT || 8050;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


console.log('Declarando routing');
var routes = require(constants.ROUTE_UBICATION);
routes(app);

console.log('Creando server');
app.listen(port);
console.log('Aplicacion iniciada en el puerto: ' + port);
