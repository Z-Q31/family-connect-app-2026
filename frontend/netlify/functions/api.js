const serverless = require('serverless-http');
// TypeScript compiled CommonJS module, default export in .default
const appModule = require('./_lib/app');
const app = appModule.default || appModule;

// Netlify Serverless Function entry
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  let path = event.path || '/';
  // Strip Netlify function path prefix
  path = path.replace('/.netlify/functions/api', '');
  // Strip /api prefix (already handled by netlify.toml redirect, but kept for safety)
  if (path.startsWith('/api')) {
    path = path.slice(4);
  }
  if (!path || path === '') path = '/';
  event.path = path;

  return handler(event, context);
};