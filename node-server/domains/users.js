class UserDomain {
  constructor(firebase) {
    this.firebase = firebase;
  }

  createUserLogin(email, password) {
    return this.firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  userLogin(email, password, admin) {
    const firebase = this.firebase;
    return this.firebase.auth().signInWithEmailAndPassword(email, password).then(function(_user_) {
      var _uid_ = firebase.auth().currentUser.uid;
      return admin.auth().createCustomToken(_uid_).then(function(_token_) {
        return {
          photoUrl: _user_.user.photoURL || '',
          uid: _uid_,
          token: _token_
        };
       });
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
        photoUrl: user.photoURL || '',
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
        displayName: body['displayName'],
        photoURL: body['photoUrl']
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