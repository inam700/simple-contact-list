const mongoose = require("mongoose");

const CONTACTSCHEMA = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
  },
  phone: {
    type: Number,
    required: true,
    maxlength: 100,
  },
});

const CONTACTS = mongoose.model("CONTACTS", CONTACTSCHEMA);
module.exports = { CONTACTS };
