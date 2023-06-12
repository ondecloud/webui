export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8081/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/oauth2/': {
      target: 'http://localhost:8081/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
