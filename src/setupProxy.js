
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/v1.0',
    createProxyMiddleware({
      target: 'https://ads.hipto.com', // Adresse de l'API à laquelle vous souhaitez accéder
      changeOrigin: true,
    })
  );
};
