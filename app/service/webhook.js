'use strict';

const crypto = require('crypto');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Service = require('egg').Service;

class WebhookService extends Service {
  get exec() {
    return exec;
  }

  sign(secret, text) {
    const hmac = crypto.createHmac('sha256', secret).update(text).digest('base64');
    return hmac;
  }
}

module.exports = WebhookService;
