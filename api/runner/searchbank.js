'use strict';

const argv = require('minimist')(process.argv.slice(2));

var firebase = require("firebase-admin");
var serviceAccount = require("./accountbank-4f2d7-firebase-adminsdk.json");

var config = {
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://accountbank-4f2d7.firebaseio.com"
  };
firebase.initializeApp(config);

var dataPersist = { name: argv.user, age: 18 };

var refExample = firebase.database().ref("example");
var newNode = refExample.child("newnode");
newNode.set(dataPersist);

