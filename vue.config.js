const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  productionSourceMap: false,
  parallel: false,
  devServer: {
    // https: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // Хедер-метка; ответ на запрос пришел через этот прокси.
        onProxyRes(proxyRes, req, res) {
          const cookies = proxyRes.headers['set-cookie'];
          if (!cookies) return;
          proxyRes.headers['set-cookie'] = [];

          for (const cookie of cookies) {
            proxyRes.headers['set-cookie'].push(cookie.replace(/Domain=.*?;/, 'Domain=localhost;'));
          }
        }
      }
    },
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
  },
  assetsDir: 'assets',
  runtimeCompiler: true,

};
