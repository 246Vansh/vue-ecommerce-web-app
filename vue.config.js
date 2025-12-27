//const path = require('path');
//
//module.exports = {
//  transpileDependencies: true,
//  configureWebpack: {
//    resolve: {
//      alias: {
//        '@': path.resolve(__dirname, 'src'), // Use path.resolve() for alias
//      },
//    },
//  },
//};
//



const path = require('path');
const webpack = require('webpack');

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },
};
