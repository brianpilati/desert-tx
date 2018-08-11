
const firebase = require('./libs/firebaseConfiguration')
const admin = require('./libs/firebaseAdminConfiguration')
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const UserDomain = require('./domains/users');
const userDomain = new UserDomain(firebase);

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(express.static(path.join(__dirname, '../../deployment')));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

function returnError(res, code, message) {
  res.status(code).send(
    Object({
      status: code,
      error: message
    })
  );
}

app.post('/api/users', cors(corsOptions), function(req, res) {
  userDomain.createUserLogin(req.body.email, req.body.password).then(function(response) {
    console.log(response);
  });
});

app.post('/api/auth', cors(corsOptions), function(req, res) {
  userDomain.userLogin(userName, password, admin).then(function(_token_) {
      res.status(200).json({
        token: _token_
      });
  });
});

app.get('/api/auth/logout', cors(corsOptions), function(req, res) {
  userDomain.userLogout().then(function() {
      res.status(200).json({
        token: _token_
      });
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));