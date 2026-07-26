const serverless = require('serverless-http');
// TypeScript 编译后的 CommonJS 模块,default 导出在 .default 属性上
const appModule = require('./_lib/app');
const app = appModule.default || appModule;

// Netlify Serverless Function 入口
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  let path = event.path || '/';
  // 去掉 Netlify Function 路径前缀
  path = path.replace('/.netlify/functions/api', '');
  // 去掉 /api 前缀(前端通过 netlify.toml redirect 已经转发了,但兼容处理)
  if (path.startsWith('/api')) {
    path = path.slice(4);
  }
  if (!path || path === '') path = '/';
  event.path = path;

  return handler(event, context);
};
