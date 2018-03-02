'use strict';

/*const argv = require('minimist')(process.argv.slice(2));

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
*/
const Horseman = require('node-horseman');

const urlSearch = 'http://www.pricingcompass.com/login.do';

const horseman = new Horseman();
horseman.open(urlSearch)
        .type('input[name="username"]', 'vrodriguez')
        .type('input[name="password"]', 'vrodriguez123')
        .click('button[id="boton_entrar"]')
        .wait(3000)
        .text('#resumen-stock')
        .log()
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

