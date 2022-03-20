const mongoose = require("mongoose");

//creating schema
const TodoSchema = new mongoose.Schema({
  record: { type: String, required: true },
  date: {
    type: Number,
    default: () => {
      return Date.now();
    },
  },
});

const model = mongoose.model("TodoModel", TodoSchema);

module.exports = model;
