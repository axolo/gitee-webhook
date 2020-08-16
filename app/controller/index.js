'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async create() {
    const { ctx } = this;
    const { request } = ctx;
    const { header, query, body } = request;
    ctx.body = { header, query, body };
  }
}

module.exports = HomeController;
