const Package = require("../model/PackageModel.js");

module.exports = {
  async create(req, res) {
    const { status, data } = await Package.create(req.body);
    return res.status(status).send(data);
  },

  async getById(req, res) {
    const { status, data } = await Package.getById(req.params.id);
    return res.status(status).send(data);
  },

  async get(req, res) {
    const { status, data } = await Package.get(req.query);
    return res.status(status).send(data);
  },

  async update(req, res) {
    const { status, data } = await Package.update(
      req.params.id,
      req.body,
    );
    return res.status(status).send(data);
  },

  async delete(req, res) {
    const { status, data } = await Package.delete(req.params.id);
    return res.status(status).send(data);
  },
};
