class UserDomain {
  constructor(firebase) {
    this.firebase = firebase;
  }

  createUserLogin(email, password) {
    const firebase = this.firebase;
    return this.firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userId).set({
        username: email,
        email: email
      }).catch(function(error) {
        console.log('createUser error', error.code, error.message);
      });
    }).catch(function(error) {
      console.log('createUserLogin error', error.code, error.message);
    });
  }

  userLogin(email, password, admin) {
    const firebase = this.firebase;
    return this.firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      var uid = firebase.auth().currentUser.uid;
      return admin.auth().createCustomToken(uid).then(function(customToken) {
        return customToken;
      })
      .catch(function(error) {
        console.log("Error creating custom token:", error.code, error.message);
      });
    }).catch(function(error) {
      console.log('userLogin error', error.code, error.message);
    });
  }

  userLogout(token) {
    const firebase = this.firebase;
    return this.tokenLogin(token)
    .then(function() {
      return firebase.auth().signOut();
    });
  }

  tokenLogin(token) {
    return this.firebase.auth().signInWithCustomToken(token).catch(function(error) {
      console.log('tokenLogin error', error.code, error.message);
    });
  }

  userProfile(token) {
    const firebase = this.firebase;
    return this.tokenLogin(token)
    .then(function() {
      var uid = firebase.auth().currentUser.uid;
      return firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
        return snapshot.val();
      }).catch(function(error) {
        console.log('userProfile error', error.code, error.message);
        return (error);
      });
    });
  }
};

module.exports = UserDomain;