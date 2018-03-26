'use strict'

exports.firebase_authenticate = function() {
  const firebase = require("firebase-admin");
  const serviceAccount = require("./accountbank-4f2d7-firebase-adminsdk.json");

  var config = {
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: "https://accountbank-4f2d7.firebaseio.com"
    };
  firebase.initializeApp(config);
  return firebase;
}
