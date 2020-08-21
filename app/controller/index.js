'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async create() {
    const { ctx, app, service } = this;
    const { body } = ctx.request;
    const { repository: { url } = {}, hook_name, timestamp, sign, refs } = body;
    // 匹配勾子
    const hook = app.config.hooks.find(h => h.repository.url === url && h.hook_name === hook_name);
    if (!hook) {
      ctx.body = { errcode: 404, errmsg: 'hooks not found', errinfo: { url, hook_name } };
      return;
    }
    // 匹配分支
    const { secret, exec } = hook;
    if (hook.refs && hook.refs !== refs) {
      ctx.body = { errcode: 403, errmsg: 'branch not match', errinfo: refs };
      return;
    }
    // 校验签名
    const text = timestamp + '\n' + secret;
    const hmac = service.webhook.sign(secret, text);
    if (hmac !== sign) {
      ctx.body = { errcode: 401, errmsg: 'sign not match', errinfo: { sign } };
      return;
    }
    // 匹配及校验成功
    const res = { errcode: 0, errmsg: 'ok' };
    ctx.body = res;
    // 执行脚本（很大可能会响应超时）
    service.webhook.exec(exec).then(({ stderr, stdout }) => {
      if (stderr) return ctx.logger.error(`${exec}\n${stderr}`);
      ctx.logger.info(`${exec}\n${stdout}`);
    }).catch(err => {
      ctx.logger.error(err);
    });
  }
}

module.exports = HomeController;
