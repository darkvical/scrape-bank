'use strict';

var firebase = require("firebase-admin");
var serviceAccount = require("./accountbank-4f2d7-firebase-adminsdk.json");

var config = {
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://accountbank-4f2d7.firebaseio.com"
  };
firebase.initializeApp(config);

var refExample = firebase.database().ref("example");
var newNode = refExample.child("newnode");
newNode.set({
  name: 'Sasuke',
  age: 18
});

/*var refCountries = firebase.database().ref("countries/");
refCountries.orderByChild("name").once('value').then(function(countries) {
    countries.forEach(function(country) {
      console.log(country.val());
    });
    process.exit();
});*/

const argv = require('minimist')(process.argv.slice(2));
console.log(argv.user);
