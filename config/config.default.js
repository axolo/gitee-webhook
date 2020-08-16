/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597542673364_3462';

  // proxy
  // https://eggjs.org/zh-cn/tutorials/proxy.html
  config.proxy = true;

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // CSRF
  // https://eggjs.org/zh-cn/core/security.html
  config.security = {
    csrf: {
      enable: false,
      // ignore: ctx => require('ip').isPrivate(ctx.ip),
    },
    domainWhiteList: [ '*' ], // FIXME: only for development
  };

  return {
    ...config,
    ...userConfig,
  };
};
