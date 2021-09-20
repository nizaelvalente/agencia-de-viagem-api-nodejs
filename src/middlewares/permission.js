const mongoose = require("mongoose");
require("dotenv").config();

module.exports = (req, res, next) => {
  if (req.user.admin){
      return next()
  }
  return res.status(401).send({ erro: "Sem permissão" });
};
