import { VercelRequest, VercelResponse } from '@vercel/node';
import app from './_lib/app';

// Vercel Serverless Function catch-all 入口
// 所有 /api/* 请求都会经过这里,由 Express app 处理
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Vercel 会自动将路径映射到 /api/ 下
  // 我们需要将 req.url 调整为去掉 /api 前缀后的路径
  const url = req.url || '/';
  const path = url.startsWith('/api') ? url.slice(4) : url;
  req.url = path || '/';
  
  return app(req, res);
}
