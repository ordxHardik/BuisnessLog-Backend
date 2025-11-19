const serverless = require('serverless-http');
const app = require('../index');

// AWS Lambda handler (or any platform compatible with serverless-http)
module.exports.handler = serverless(app);
