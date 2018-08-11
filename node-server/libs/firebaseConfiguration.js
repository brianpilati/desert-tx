const firebase = require("firebase");
const serviceAccount = require("./serviceAccountKey.json");

module.exports = firebase.initializeApp(serviceAccount);