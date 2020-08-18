'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async create() {
    const { ctx, app, service } = this;
    const { header, body, query } = ctx.request;
    const { repository: { url }, hook_name, timestamp, sign, refs } = body;
    console.log({ header, body, query });
    const hook = app.config.hooks.find(h => h.repository.url === url && h.hook_name === hook_name);
    if (!hook) {
      ctx.body = {
        errcode: 404,
        errmsg: 'hooks not found',
        errinfo: { url, hook_name },
      };
      return;
    }
    const { secret, exec } = hook;
    if (hook.refs && hook.refs !== refs) {
      ctx.body = {
        errcode: 403,
        errmsg: 'branch not match',
        errinfo: refs,
      };
      return;
    }
    const text = timestamp + '\n' + secret;
    const hmac = service.webhook.sign(secret, text);
    if (hmac !== sign) {
      ctx.body = {
        errcode: 401,
        errmsg: 'sign not match',
        errinfo: { sign },
      };
      return;
    }
    const { stdout, stderr } = await service.webhook.exec(exec);
    if (stderr) {
      ctx.body = {
        errcode: 502,
        errmsg: 'exec failed',
        errinfo: stderr,
      };
      return;
    }
    ctx.logger.info(stdout);
    const res = {
      errcode: 0,
      errmsg: 'ok',
    };
    ctx.body = res;
  }
}

module.exports = HomeController;
