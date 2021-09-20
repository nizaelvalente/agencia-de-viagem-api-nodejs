
const Ticket = require("../model/ticketModel.js");

module.exports = {
  async create(req, res) {
    const { status, data } = await Ticket.create(req.body);
    return res.status(status).send(data);
  },

  async getById(req, res) {
    const { status, data } = await Ticket.getById(req.params.id);
    return res.status(status).send(data);
  },

  async get(req, res) {
    const { status, data } = await Ticket.get(req.query);
    return res.status(status).send(data);
  },

  async update(req, res) {
    const { status, data } = await Ticket.update(
      req.params.id,
      req.body,
    );
    return res.status(status).send(data);
  },

  async delete(req, res) {
    const { status, data } = await Ticket.delete(req.params.id);
    return res.status(status).send(data);
  },
};
