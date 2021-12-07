var env = require('../config');

exports.config = function() {
  var node_env = process.env.NODE_ENV || 'production';
  return env[node_env.trim()];
};