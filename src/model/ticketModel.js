const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const TicketSchema = mongoose.model("Ticket");
// const { ObjectId } = mongoose.Types;

// require("dotenv").config();

module.exports = {
  async create(newTicketData) {
    try {
      const newTicket = await TicketSchema.create(newTicketData)
      return { status: 200, data: newTicket};
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async getById(id) {
    try {
      const [ticket] = await TicketSchema.find({_id: ObjectId(id), deleted: false})
      if (!ticket) {
        return { status: 400, data: { erro: "Viagem não encontrado" } };
      }
      return { status: 200, data: ticket };

    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async get(query) {
    try {
      query.deleted = false;
      const tickets = await TicketSchema.find(query);
      return { status: 200, data: tickets };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async update(id, data) {
    try {
          const viagem = await TicketSchema.findByIdAndUpdate(id, data, {
        new: true,
      }); //
      return { status: 200, data: viagem };

    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async delete(id) {
    try {
      await TicketSchema.findByIdAndUpdate(id, { deleted: true });
      return { status: 200, data:{ data: "Viagem deletado com sucesso"} };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },
};
