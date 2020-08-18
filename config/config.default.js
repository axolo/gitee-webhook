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
    domainWhiteList: [ '*' ], // FIXME: only for development
  };

  // WebHooks
  // https://gitee.com/help/categories/40
  config.hooks = [{
    userAgent: 'git-oschina-hook', // 供应商识别串
    repository: { url: 'https://gitee.com/oschina/git-osc' }, // 仓库
    ref: 'refs/heads/test_version', // 触发的分支
    hook_name: 'push_hooks', // 触发的事件
    secret: 'this is secret', // 密钥
    exec: 'bash git-osc-push.sh', // 执行的脚本
  }];

  return config;
};
