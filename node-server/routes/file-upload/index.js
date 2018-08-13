const router = require('express').Router();
const firebase = require('../../libs/firebaseConfiguration')
const cors = require('cors');
const FileUpload = require('../../domains/file-upload');
const fileUploadDomain = new FileUpload(firebase);
const corsOptions = require('../../libs/cors');
const utilities = require('../../libs/utilities');

router.post('/', cors(corsOptions), function(req, res) {
  fileUploadDomain.fileUpload(req.body, utilities.getToken(req)).then(function() {
    res.status(200);
    res.send();
  })
});

router.get('/', cors(corsOptions), function(req, res) {
  fileUploadDomain.getFiles(utilities.getToken(req)).then(function(_files_) {
    res.status(200).json(_files_);
  })
});

module.exports = router;  