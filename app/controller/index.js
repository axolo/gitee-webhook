'use strict';

const crypto = require('crypto');
const cp = require('child_process');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async create() {
    const { ctx, app } = this;
    const { header, body, query } = ctx.request;
    const { repository: { url }, hook_name, timestamp, sign } = body;
    console.log({ header, body, query });
    const hook = app.config.hooks.find(h => h.repository.url === url && h.hook_name === hook_name);
    if (!hook) throw new Error('hooks not found');
    const { secret } = hook;
    const text = timestamp + '\n' + secret;
    const hmac = crypto.createHmac('sha256', secret).update(text).digest('base64');
    if (hmac !== sign) throw new Error('sign not match');
    cp.exec('ls', (err, stdout, stderr) => {
      if (err) throw new Error(err);
      console.log({ stdout, stderr });
    });
    const res = { errcode: 0, errmsg: 'ok' };
    ctx.body = res;
  }
}

module.exports = HomeController;
