'use strict';
const argv = require('minimist')(process.argv.slice(2));
const authenticate = require("../models/authenticate");
const Horseman = require('node-horseman');

const firebase = authenticate.firebase_authenticate();
const database = firebase.database();

const users = database.ref('users');

let user = users.orderByChild('user').equalTo(argv.user).once('child_added', function(snapshot) {

  let user = snapshot.val();
  const banks = user.banks;
  const templateBanks = database.ref('banks');
  
  for(let key in banks) {
    let bank = banks[key];
    let doc = bank.credentials.document;
    let password = bank.credentials.password;
    const templateBank = templateBanks.orderByChild('code').equalTo(bank.code);


    let adressInformation = 'users/' + snapshot.key + '/banks/' + bank.position + '/detail';

    templateBank.once('child_added', function(snapshot) {

      const template = snapshot.val();
      const urlSearch = template.url;
      const urlSearchAfter = template.urlAfter;
      const formLogin = template.formLogin;
      const documentField = formLogin.document.fieldId;
      const passwordField = formLogin.password.fieldId;
      const accessField = formLogin.access.fieldId;

      const horseman = new Horseman();
      horseman.on('resourceError', function(err) {
        //console.log(err);
      });
      let templateSearch = horseman.open(urlSearch);
      let page = templateSearch
        .type(`input[id="${documentField}"]`, doc.toString())
        .type(`input[id="${passwordField}"]`, password.toString())
        .click(`button[id="${accessField}"]`)
        .wait(2000);

      const formInformation = template.formInformation;

      if(urlSearchAfter){
        let pageInformation = page
          .open(urlSearchAfter)
          .wait(1000);

        for (let count = 0; count < formInformation.length; count++) {
          let information = formInformation[count];
          pageInformation
            .html(information.type)
            .then(text => {
              var example = database.ref(adressInformation + '/amount/' + count + '/type');
              example.set(text.trim());
            })
            .html(information.number)
            .then(text => {
              var example = database.ref(adressInformation + '/amount/' + count + '/number');
              example.set(text.trim());
            })
            .html(information.amount)
            .then(text => {
              var example = database.ref(adressInformation + '/amount/' + count + '/amount');
              example.set(text.trim());
            })//DEBIT, LINE AND CREDIT
            .html(information.authorized)
            .then(text => {
              if(information.typeAccount != 'DEBIT') {
                var example = database.ref(adressInformation + '/amount/' + count + '/authorized');
                example.set(text.trim());
              }
            })
            .html(information.used)
            .then(text => {
              if(information.typeAccount != 'DEBIT') {
                var example = database.ref(adressInformation + '/amount/' + count + '/used');
                example.set(text.trim());
              }
            })
            .html(information.money)
            .then(text => {
              if(information.typeAccount == 'CREDIT') {
                var example = database.ref(adressInformation + '/amount/' + count + '/money');
                example.set(text.trim());
              }
            });
        }
      }
    });
  }
});

