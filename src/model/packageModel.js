const mongoose = require("mongoose");
const PackageSchema = mongoose.model("Package");
const { ObjectId } = mongoose.Types;

require("dotenv").config();

module.exports = {
  async create(newPackageData) {
    try {
      const newPackage = await PackageSchema.create(newPackageData)
      return { status: 200, data: newPackage };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async getById(id) {
    try {
      const [package] = await PackageSchema.find({
        _id: ObjectId(id),
        deleted: false,
      }).populate('lodge ticket')

      if (!package) {
        return { status: 400, data: { erro: "Pacote não encontrado" } };
      }
      return { status: 200, data: package };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async get(query) {
    try {
      query.deleted = false
      const packages = await PackageSchema.find(query)
      return { status: 200, data: packages };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async update(id, data) {
    try {
          const pacote = await PackageSchema.findByIdAndUpdate(id, data, {
        new: true,
      })
      return { status: 200, data: pacote };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async delete(id) {
    try {
      await PackageSchema.findByIdAndUpdate(id, { deleted: true });
      return { status: 200, data: {data: "Pacote deletado com sucesso" }};
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },
};
