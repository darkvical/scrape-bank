'use strict';
var constants = require('../util/constants');

console.log('Init appRoute.js');

module.exports = function(app) {
  var review_account_controller = require(constants.CONTROLLER_ACCOUNT);

  app.route('/').get(function(request, response) {
    let data = {
      message: 'Welcome to the API for currency and managment of accounts',
      endpoints: [
        { name: '/review_account/', method: 'GET', parameters: 'user', example: 'https://appbankcrowling.herokuapp.com/review_account/<user>'},
      ]
    };
    response.json(data);
  });

  app.route(constants.END_POINT_ACCOUNT_LIST_REVIEW + ':userId')
    .get(review_account_controller.list_review);
  
};
