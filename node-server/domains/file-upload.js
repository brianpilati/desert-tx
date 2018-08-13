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
      const filesRef = firebase.database().ref('files').child( uid);
      filesRef.push({
        fileName: body['fileName']
      });
    });
  }

  getFiles(token) {
    const firebase = this.firebase;
    return this.tokenLogin(token).then(function() {
      var uid = firebase.auth().currentUser.uid;
      return firebase.database().ref('files/' + uid).once('value').then(function(snapshot) {
        const files = [];
        snapshot.forEach(function(childSnapshot) {
          files.push(childSnapshot.val());
        });
        return files;
      });
    });
  }
}

module.exports = FileUploadDomain;