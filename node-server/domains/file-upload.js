var request = require('request');

class FileUploadDomain {
  constructor(firebase) {
    this.firebase = firebase;
  }

  tokenLogin(token) {
    return this.firebase.auth().signInWithCustomToken(token);
  }

  fileUpload(body, token) {
    const firebase = this.firebase;
    return this.tokenLogin(token).then(function() {
      var uid = firebase.auth().currentUser.uid;
      return firebase.database().ref('files/' + uid).set({
        fileName: body['fileName']
      });
    });
  }
}

module.exports = FileUploadDomain;