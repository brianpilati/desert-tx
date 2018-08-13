module.exports = {
  getToken: function(req) {
    return req.headers['authorization'];
  }
};