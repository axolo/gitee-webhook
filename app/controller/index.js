'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async create() {
    const { ctx, app, service } = this;
    const { body } = ctx.request;
    const { repository: { url } = {}, hook_name, timestamp, sign, ref } = body;
    // 匹配勾子
    const { webhooks } = app.config;
    const hook = webhooks.find(h => h.repository.url === url && h.hook_name === hook_name && h.ref === ref);
    if (!hook) {
      const errcode = 404;
      ctx.status = errcode;
      ctx.body = { errcode, errmsg: 'hook invalid', errinfo: { url, hook_name } };
      return;
    }
    const { secret, exec } = hook;
    // 确认命令
    if (!exec) {
      const errcode = 204;
      ctx.status = errcode;
      ctx.body = { errcode, errmsg: 'not exec', errinfo: 'nothing to do' };
      return;
    }
    // 校验签名
    const text = timestamp + '\n' + secret;
    const hmac = service.webhook.sign(secret, text);
    if (hmac !== sign) {
      const errcode = 401;
      ctx.status = errcode;
      ctx.body = { errcode: 401, errmsg: 'sign invalid', errinfo: { sign } };
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

module.exports = IndexController;
