const firebase = require("firebase");
const serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp(serviceAccount);

const email = 'brian@test.com';
const password = 'secret';

/*
firebase.auth().createUserWithEmailAndPassword(email, password).
then(function() {
  var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('users/' + userId).set({
    username: email,
    email: email
  }).then(function(call) {
    console.log(1, call);
  }).catch(function(error) {
    console.log('error - 1', error.code, error.message);
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}).catch(function(error) {
  console.log('error', error.code, error.message);
  var errorCode = error.code;
  var errorMessage = error.message;
});
*/


firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
  console.log('email', user.user.email);
  var userId = firebase.auth().currentUser.uid;
  console.log('uid', userId);

  /*
  firebase.database().ref('users/' + userId).set({
    userId: userId,
    username: email,
    email: email
  }).then(function(call) {
    console.log(1, call);
  });
  */

  firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    console.log(snapshot.val());
    console.log(username, snapshot.val().username);
  }).catch(function(error) {
    console.log('hmmm', error);
  });
  /*
  firebase.database().ref('/users/' + userId).on('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    console.log(snapshot.val());
    console.log(username, snapshot.val().username);
  });
  */
}).catch(function(error) {
  console.log('error', error.code, error.message)
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});


/*
firebase.auth().signOut().then(function() {
  console.log('signed-out');
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
*/



/*
firebase.database().ref('users/' + userId).set({
  username: name,
  email: email,
  profile_picture : imageUrl
});
*/