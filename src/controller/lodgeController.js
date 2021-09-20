const Lodge = require("../model/lodgeModel.js");

module.exports = {
  async create(req, res) {
    const { status, data } = await Lodge.create(req.body);
    return res.status(status).send(data);
  },

  async getById(req, res) {
    const { status, data } = await Lodge.getById(req.params.id);
    return res.status(status).send(data);
  },

  async get(req, res) {
    const { status, data } = await Lodge.get(req.query);
    return res.status(status).send(data);
  },

  async update(req, res, ) {
    const { status, data } = await Lodge.update(
      req.params.id,
      req.body
    );
    return res.status(status).send(data);
  },

  async delete(req, res) {
    const { status, data } = await Lodge.delete(req.params.id);
    return res.status(status).send(data);
  },
};
