const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    lodge: { type: String, ref: "Lodge" },
    ticket: { type: String, ref: "Ticket" },
    discount: { type: Boolean, default: false },
    discountValue: { type: Number, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

mongoose.model("Package", PackageSchema);
