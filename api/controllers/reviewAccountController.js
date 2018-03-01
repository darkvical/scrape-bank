'use strict';

console.log('Init reviewAccountController.js');

exports.list_review = function(req, res) {
  console.log('method list review: ' + req.params.userId);
  var data = { 'name': 'vical' };
  res.json(data);
};
