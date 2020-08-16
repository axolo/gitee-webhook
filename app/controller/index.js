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
    const res = { header, query, body };
    console.log(res);
    ctx.body = res;
  }
}

module.exports = HomeController;
