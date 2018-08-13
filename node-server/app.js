const firebase = require('./libs/firebaseConfiguration')
const admin = require('./libs/firebaseAdminConfiguration')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const UserDomain = require('./domains/users');
const userDomain = new UserDomain(firebase);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use('/api', require('./routes'));

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

function returnError(res, code, message) {
  res.status(code).send(
    Object({
      status: code,
      error: message
    })
  );
}

app.post('/api/auth', cors(corsOptions), function(req, res) {
  userDomain.userLogin(req.body.email, req.body.password, admin).then(function(_token_) {
    res.status(200).json({
      token: _token_
    });
  }).catch(function(_error_) {
    res.status(401).json(_error_);
  });
});

app.get('/api/auth/logout', cors(corsOptions), function(req, res) {
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

app.listen(3000, () => console.log('Example app listening on port 3000!'));