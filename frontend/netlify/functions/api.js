const serverless = require('serverless-http');
const app = require('./_lib/app');

// Netlify Serverless Function 入口
const handler = serverlessHttp(app);

module.exports.handler = async (event, context) => {
  let path = event.path || '/';
  path = path.replace('/.netlify/functions/api', '');
  if (path.startsWith('/api')) {
    path = path.slice(4);
  }
  if (!path || path === '') path = '/';
  event.path = path;

  return handler(event, context);
};