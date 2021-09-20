const User = require("../model/userModel.js");

module.exports = {
  async create(req, res) {
    const { status, data } = await User.create(req.body);
    return res.status(status).send(data);
  },

  async auth(req, res) {
    const { status, data } = await User.auth(req.body);
    return res.status(status).send(data);
  },

  async getAuth(req, res) {
    return res.status(status).send(data);
  },


  async getById(req, res) {
    const { status, data } = await User.getById(req.params.id);
    return res.status(status).send(data);
  },

  async get(req, res) {
    const { status, data } = await User.get(req.query);
    return res.status(status).send(data);
  },

  async update(req, res) {
    const { status, data } = await User.update(
      req.params.id,
      req.body,
      req.user
    );
    return res.status(status).send(data);
  },

  async updateAdmin(req, res) {
    const { status, data } = await User.updateAdmin(req.params.id, req.body);
    return res.status(status).send(data);
  },

  async delete(req, res) {
    const { status, data } = await User.delete(req.params.id);
    return res.status(status).send(data);
  },
};
