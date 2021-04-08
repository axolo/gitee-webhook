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

  // CSRF
  // https://eggjs.org/zh-cn/core/security.html
  config.security = {
    csrf: {
      enable: false,
      // ignore: ctx => require('ip').isPrivate(ctx.ip),
    },
    // WARNING: only for development
    domainWhiteList: [ '*' ],
  };

  // WebHooks
  // https://gitee.com/help/categories/40
  config.webhooks = [{
    userAgent: 'git-oschina-hook', // 服务商识别串
    repository: { url: 'https://gitee.com/oschina/git-osc' }, // 仓库
    ref: 'refs/heads/develop', // 触发的分支
    hook_name: 'push_hooks', // 触发的事件
    secret: 'SECRET_OF_WEBHOOK', // 密钥
    exec: 'ls /root/projects/git-osc', // 执行的脚本
  }];

  return config;
};
