/// base do campo de dados
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 30, minlength: 3 },
    gender: { type: String, enum: ["M", "F"], required: true },
    age: { type: Number, required: true, min: 18 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    address: {
      logradouro: { type: String, required: true },
      localidade: { type: String, required: true },
      numero: { type: String, required: true },
      bairro: { type: String, required: true },
      uf: { type: String, required: true },
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const quantity = Math.floor(Math.random());
  this.password = await bcrypt.hash(this.password, quantity);
});

mongoose.model("User", UserSchema); // onde esta esse 'User'??????
