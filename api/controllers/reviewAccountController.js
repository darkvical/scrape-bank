'use strict';

console.log('Init reviewAccountController.js');

exports.list_review = function(req, res) {
  const user = req.params.userId;
  var exec = require('child_process').exec;
  exec('node ./api/runner/searchbank.js --user=' + user, function(error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ', error);
    }
    console.log('fin de proceso');
    var data = { 'name': 'vical' };
    res.json(data);
  });
};
