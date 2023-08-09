export default {
  dev: {
    '/api/': {
      target: 'http://localhost:18080/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/oauth2/': {
      target: 'http://localhost:18080/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
