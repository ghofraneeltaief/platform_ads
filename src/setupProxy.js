const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api/v1.0', createProxyMiddleware({
    target: 'https://ads.hipto.com',
    changeOrigin: true,
  }));
};
