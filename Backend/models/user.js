const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//model for userof the system
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    blood_type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    admin_approval: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
