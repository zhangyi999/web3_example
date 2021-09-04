/*
 * @Author: sam
 * @Date: 2021-06-21 10:58:42
 * @LastEditTime: 2021-07-21 16:10:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/config-overrides.js
 */

const { override, fixBabelImports, addWebpackAlias, addWebpackPlugin } = require('customize-cra');

const  UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

const findWebpackPlugin = (plugins, pluginName) => plugins.find(plugin => plugin.constructor.name === pluginName);

// 自定义 webpack
function overrideProcessEnv(value = {}) {
    return config => {
        const definePlugin = findWebpackPlugin(config.plugins, 'DefinePlugin')
        definePlugin.definitions['process.env'] = {
            ...value,
        };
        return config
    }
}

// 查看打包后各包大小
const addAnalyzer = () => config => {
  if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};

const addCustom = () => config => {
  let plugins = []

  config.plugins = [...config.plugins, ...plugins]
  return config
}


module.exports = override(
  addCustom(),
  addWebpackPlugin(
    // 终端进度条显示
    new ProgressBarPlugin()
  ),
  addAnalyzer(),
  fixBabelImports("import", [
    {
      libraryName: "@material-ui/core",
      libraryDirectory: "esm",
      camel2DashComponentName: false
    }
  ]),
  // 注意是production环境启动该plugin
  process.env.NODE_ENV === 'production' && addWebpackPlugin(
    new UglifyJsPlugin({
    // 开启打包缓存
    cache: true,
    // 开启多线程打包
    parallel: true,
    uglifyOptions: {
      // 删除警告
      warnings: false,
      // 压缩
      compress: {
      // 移除console
      drop_console: true,
      // 移除debugger
      drop_debugger: true
      }
    }
    })
  ),
  // fixBabelImports('import', {
  //   libraryName: 'antd-mobile',
  //   style: 'css',
  // }),
  addWebpackAlias({
    '@': resolve('src')
  }),
  overrideProcessEnv({
    VCONSOLE: process.env.VCONSOLE
  })
);
