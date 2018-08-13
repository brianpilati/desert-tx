const router = require('express').Router();
const firebase = require('../../libs/firebaseConfiguration')
const cors = require('cors');
const UserDomain = require('../../domains/users');
const userDomain = new UserDomain(firebase);
const corsOptions = require('../../libs/cors');
const admin = require('../../libs/firebaseAdminConfiguration')

router.post('/', cors(corsOptions), function(req, res) {
  userDomain.userLogin(req.body.email, req.body.password, admin).then(function(_token_) {
    res.status(200).json(_token_);
  }).catch(function(_error_) {
    res.status(401).json(_error_);
  });
});

router.get('/logout', cors(corsOptions), function(req, res) {
  const token = req.headers['authorization'];
  if (token !== 'undefined') {
    userDomain.userLogout(token).then(function() {
      res.status(200);
      res.send();
    }).catch(function(error) {
      res.status(200);
      res.send();
    });
  } else {
    res.status(200);
    res.send();
  }
});

module.exports = router;  