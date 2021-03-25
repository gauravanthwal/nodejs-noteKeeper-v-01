require("./db");
const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;
