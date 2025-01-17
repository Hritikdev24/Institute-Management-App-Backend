const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true }
);

const feeModel = mongoose.model("fee", feeSchema);

module.exports = { feeModel };
