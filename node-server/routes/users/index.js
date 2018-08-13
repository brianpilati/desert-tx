const router = require('express').Router();
const firebase = require('../../libs/firebaseConfiguration')
const cors = require('cors');
const UserDomain = require('../../domains/users');
const userDomain = new UserDomain(firebase);
const corsOptions = require('../../libs/cors');
const utilities = require('../../libs/utilities');

router.post('/', cors(corsOptions), function(req, res) {
  userDomain.createUserLogin(req.body.email, req.body.password, ).then(function() {
    userDomain.userLogin(req.body.email, req.body.password, admin).then(function(_token_){
      res.status(200).json({
        token: _token_
      });
    }).catch(function(_error_) {
      res.status(401).json(_error_);
    });
  });
});

router.get('/', cors(corsOptions), function(req, res) {
  userDomain.userProfile(utilities.getToken(req)).then(function(_user_) {
    res.status(200).json(_user_);
  }).catch(function(_error_) {
    res.status(401).json(_error_);
  });
});

router.put('/', cors(corsOptions), function(req, res) {
  userDomain.updateProfile(utilities.getToken(req), req.body).then(function() {
    res.status(200);
    res.send();
  });
});

router.put('/password', cors(corsOptions), function(req, res) {
  userDomain.updatePassword(utilities.getToken(req), req.body).then(function() {
    res.status(200);
    res.send();
  });
});

module.exports = router;  