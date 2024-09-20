const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
     
    },
    desc: {
      type: String,
      required: true,
     
    },
    important: {
      type: Boolean,
      default: false,
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("task", taskSchema);
