const TerserPlugin = require("terser-webpack-plugin");

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.esbuildMinify,
          terserOptions: {},
        }),
      ],
    };
  },
});
