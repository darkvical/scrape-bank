'use strict';
var constants = require('../util/constants');

console.log('Init appRoute.js');

module.exports = function(app) {
  var review_account_controller = require(constants.CONTROLLER_ACCOUNT);

  app.route(constants.END_POINT_ACCOUNT_LIST_REVIEW + ':userId')
    .get(review_account_controller.list_review);
};
