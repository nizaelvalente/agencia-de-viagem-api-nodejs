const mongoose = require("mongoose");
const UserSachema = mongoose.model("User");
const { ObjectId } = mongoose.Types;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async create(newUserData) {
    try {
      delete newUserData._id;
      delete newUserData.admin;
      const userData = validation(newUserData);
      if (userData.status == 400) {
        return userData;
      }
      const usuarioCriado = await UserSchema.create(userData);
      return { status: 200, data: usuarioCriado };
    } catch (error) {
      if (error.message.includes("E11000")) {
        return { status: 400, data: { erro: "email já cadastrdo." } };
      }
      return { status: 400, data: { erro: error.message } };
    }
  },

  async auth(data) {
    try {
      const { email, password } = data;

      if (!email || !password) {
        return {
          status: 400,
          data: { erro: "Todos os campos são obrigatórios" },
        };
      }

      const user = await UserSchema.findOne({ email }).select("+password");

      if (!user) {
        return { status: 400, data: { erro: "Dados incorretos" } };
      }

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return { status: 400, data: { erro: "Dados incorretos" } };
      }

      const token = generateToken({ _id: user._id.toString() });

      return { status: 200, data: { token, user } };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async getById(id) {
    try {
      const [usuario] = await UserSchema.find({
        _id: ObjectId(id),
        deleted: false,
      });

      if (!usuario) {
        return { status: 400, data: { erro: "Usuario não encontrado" } };
      }
      return { status: 200, data: usuario };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async get(query) {
    try {
      query.deleted = false;
      const usuarios = await UserSchema.find(query);
      return { status: 200, data: usuarios };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async update(id, data, user) {
    try {
      delete data.admin;
      if (user._id.toString() !== id) {
        return { status: 400, data: { erro: "Sem autorização" } };
      }
      const usuario = await UserSchema.findByIdAndUpdate(id, data, {
        new: true,
      }); //
      return { status: 200, data: usuario };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async updateAdmin(id) {
    try {
      const usuario = await UserSchema.findByIdAndUpdate(
        id,
        { admin: true },
        { new: true }
      );
      return { status: 200, data: usuario };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },

  async delete(id) {
    try {
      await UserSchema.findByIdAndUpdate(id, { deleted: true });
      return { status: 200, data: { data: "Usuario deletado com sucesso" } };
    } catch (error) {
      return { status: 400, data: { erro: error.message } };
    }
  },
};

function generateToken(params = {}) {
  const token = jwt.sign(params, process.env.SECRET, { expiresIn: 86400 });
  return `Bearer ${token}`;
}

function validation(newUserData) {
  const { name, gender, age, email, password } = newUserData;
  const { logradouro, localidade, numero, bairro, uf } = newUserData.address;

  if (
    !name ||
    !gender ||
    !age ||
    !email ||
    !password ||
    !logradouro ||
    !localidade ||
    !numero ||
    !bairro ||
    !uf
  ) {
    return { status: 400, data: "Todos os campos são obrigatórios" };
  }

  if (name.length < 3 || name.length > 30 || regex.name(name)) {
    return { status: 400, data: "Nome inválido" };
  }
  if (password.length < 8 || password.length > 16 || regex.password(password)) {
    return { status: 400, data: "Senha inválido" };
  }

  if (age < 18) {
    return { status: 400, data: "Idade inválido" };
  }

  if (!email.includes("@")) {
    return { status: 400, data: "Email inválido" };
  }

  if (gender.toUpperCase() != "M" && gender.toUpperCase() != "F") {
    return { status: 400, data: "Sexo inválido" };
  }
  return newUserData;
}

const regex = {
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  number: /[0-9]/,
  specialCharacter: /[@#$%¨&*",.;`:?ºª+=§\-_|)(\][}{]/,
  name: (name) => {
    if (regex.specialCharacter.test(name) || regex.number.test(name)) {
      return true;
    }
    return false;
  },
  password: (password) => {
    if (
      !regex.specialCharacter.test(password) ||
      !regex.number.test(password) ||
      !regex.upperCase.test(password) ||
      !regex.lowerCase.test(password)
    ) {
      return true;
    }
    return false;
  },
};
