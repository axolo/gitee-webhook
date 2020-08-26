# webhook

[Egg.js]版WebHooks实现，当前版本适配[码云WebHooks]。


## 命令

安装运行调试命令遵循[Egg.js]规范。

```bash
yarn        # 安装
yarn dev    # 开发
yarn start  # 后台运行
yarn stop   # 结束后台运行
# open http://localhost:7999/
```

## 配置

1. 本地请使用SSH方式关联仓库，并将本地公钥启用到仓库的WebHooks
2. 在本应用的配置（`app/config`）里按以下格式配置WebHooks

```js
// app/config/config.default.js
config.webhooks = [{
  userAgent: 'git-oschina-hook', // 服务商识别串
  repository: { // 仓库
    url: 'https://gitee.com/oschina/git-osc', // 仓库地址
  },
  ref: 'refs/heads/test_version', // 触发的引用（分支）
  hook_name: 'push_hooks', // 触发的事件（在仓库设置里）
  secret: 'this is secret', // 密钥（在仓库设置里配置）
  exec: 'ls', // 执行的命令（支持Shell脚本）
}];
```

[Egg.js]: https://eggjs.org
[码云WebHooks]: https://gitee.com/help/categories/40
