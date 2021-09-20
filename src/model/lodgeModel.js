const mongoose = require("mongoose");
const LodgeSchema = mongoose.model("Lodge");
const { ObjectId } = mongoose.Types;

require("dotenv").config();

module.exports = {
  async create(newLodgeData) {
    try {
      const newLodge = await LodgeSchema.create(newLodgeData)
      return { status: 200, data: newLodge };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async getById(id) {
    try {
      const [lodge] = await LodgeSchema.find( {_id: ObjectId(id), deleted: false})

      if (!lodge) {
        return { status: 400, data: { erro: "Hospedagem não encontrado" } };
      }
      return { status: 200, data: lodge };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async get(query) {
    try {
      query.deleted = false
      const lodges = await LodgeSchema.find(query)
      return { status: 200, data: lodges };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async update(id, data) {

    try {
      const hospedagem = await LodgeSchema.findByIdAndUpdate(id, data, {
        new: true,
      })
      return { status: 200, data: hospedagem };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async delete(id) {
    try {
      await LodgeSchema.findByIdAndUpdate(id, { deleted: true });
      return { status: 200, data: {data: "Hospedagem deletado com sucesso" }};
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },
};
