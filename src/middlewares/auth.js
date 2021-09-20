const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).send({ erro: "Token não enviado." });
  }

  const parts = header.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ erro: "Erro no token." });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ erro: "Token mal formatado." });
  }

  jwt.verify(token, process.env.SECRET, async (erro, decoded) => {
    if (erro) {
      return res.status(401).send({ erro: "Token inválido." });
    }

    const user = await UserModel.findOne({ _id: String(decoded._id) });
    req.user = user;

    return next();
  });
};
