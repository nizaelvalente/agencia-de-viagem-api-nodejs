require("./schemas/userSchema");
require("./schemas/ticketSchema");
require("./schemas/lodgeSchema");
require("./schemas/packageSchema");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/", require("./routes/index"));

    app.listen(4000, () => {
      console.log("Servidor executando na porta 4000");
    });
  });
