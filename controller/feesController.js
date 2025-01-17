const { feeModel } = require("../model/feesModel.js");

async function payment(req, res) {
  const { fullName, phone, courseId, userId, amount, remark } = req.body;

  console.log("Hritik");
  console.log(fullName);
  if (!fullName || !phone || !courseId || !userId || !amount) {
    res
      .status(400)
      .json({ success: false, message: "all fields are compulsory" });
  } else {
    try {
      const newFees = await feeModel.create({
        fullName: fullName,
        phone: Number(phone),
        courseId: courseId,
        userId: userId,
        amount: Number(amount),
        remark: remark,
      });

      res.status(200).json({ success: true, message: newFees });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: false, message: "something went wrong" });
    }
  }
}

// payment history for perticulary

async function paymentHistory(req, res) {
  const { phone } = req.body;
  if (!phone) {
    res
      .status(400)
      .json({ success: false, message: "all fields are compulsory" });
  } else {
    try {
      const history = await feeModel.find({ phone: Number(phone) });
      res.status(200).json({ success: true, message: history });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  }
}

//payment history for all

async function history(req, res) {
  try {
    const allHistory = await feeModel.find({});
    res.status(200).json({ success: true, message: allHistory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
}

module.exports = { payment,paymentHistory,history};
