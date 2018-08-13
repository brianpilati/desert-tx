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
      return admin.auth().createCustomToken(uid);
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
    return this.firebase.auth().signInWithCustomToken(token);
  }

  userProfile(token) {
    const firebase = this.firebase;
    return this.tokenLogin(token)
    .then(function() {
      var user = firebase.auth().currentUser;
      return Object({
        displayName: user.displayName,
        email: user.email
      });
    });
  }

  updateProfile(token, body) {
    const firebase = this.firebase;
    return this.tokenLogin(token)
    .then(function() {
      var user = firebase.auth().currentUser;
      return user.updateProfile({
        displayName: body['displayName']
      }).then(function() {
        return user.updateEmail(body['email']);
      });
    });
  }

  updatePassword(token, body) {
    const firebase = this.firebase;
    return this.tokenLogin(token)
    .then(function() {
      var user = firebase.auth().currentUser;
      return user.updatePassword(body['password']);
    });
  }
};

module.exports = UserDomain;