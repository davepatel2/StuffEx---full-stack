const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional reference to User
  id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
