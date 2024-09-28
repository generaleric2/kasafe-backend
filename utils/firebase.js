// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../servicekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://kasafe-ad311-default-rtdb.europe-west1.firebasedatabase.app/',
});

module.exports = admin;
