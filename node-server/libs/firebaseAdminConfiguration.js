const admin = require('firebase-admin');
var serviceAccount = require('./adminServiceAccountKey.json');

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://desert-tx.firebaseio.com',
  serviceAccountId: 'firebase-adminsdk-tifqd@desert-tx.iam.gserviceaccount.com'
});