'use strict';

const Service = require('egg').Service;

class WebhookService extends Service {
  sign(secret, text) {
    return { secret, text };
  }

  exec(cmd) {
    return cmd;
  }
}

module.exports = WebhookService;
