'use strict';
const Horseman = require('node-horseman');
const argv = require('minimist')(process.argv.slice(2));

const firebase = require("firebase-admin");
const serviceAccount = require("./accountbank-4f2d7-firebase-adminsdk.json");

var config = {
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://accountbank-4f2d7.firebaseio.com"
  };
firebase.initializeApp(config);

const horseman = new Horseman();
const urlSearch = 'http://www.pricingcompass.com/login.do';
horseman.open(urlSearch)
        .type('input[name="username"]', 'vrodriguez')
        .type('input[name="password"]', 'vrodriguez123')
        .click('button[id="boton_entrar"]')
        .wait(4000)
        .text('#resumen-stock')
        .then((text) => {
          var dataPersist = { name: argv.user, age: parseInt(text) };
          var refExample = firebase.database().ref("example");
          var newNode = refExample.child("newnode");
          newNode.set(dataPersist);
        })
        .close();

/*const users = ['Viicall'];
users.forEach((user) => {
    const horseman = new Horseman();
    horseman
        .open(`http://twitter.com/${user}`)
        .text('.ProfileNav-item--followers .ProfileNav-value')
        .then((text) => {
            console.log(`${user}: ${text}`);
        })
        .close();
});*/

