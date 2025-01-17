const { studentModel } = require("../model/studentModel.js");

// Add New Student

async function addStudent(req, res) {
  const { fullName, phone, email, courseId, address, userId } = req.body;
  const image = req.file.filename;
  if (!fullName || !phone || !email || !courseId || !address || !userId) {
    res
      .status(400)
      .json({ success: false, message: "all fields are compulsory" });
  } else {
    try {
      const newUser = await studentModel.create({
        fullName: fullName,
        phone: Number(phone),
        address: address,
        email: email,
        courseId: courseId,
        userId: userId,
        image: image,
      });
      res
        .status(201)
        .json({ success: true, message: "course added", data: { newUser } });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  }
}
//Course Detail controller
async function courseDetail(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ success: false, message: "something went wrong" });
  } else {
    try {
      const info = await studentModel.find({ courseId: id });
      if (info) {
        res.status(200).json({ success: true, message: info });
      } else {
        res.status(200).json({ success: true, message: "no user enrolled" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  }
}
//perticular student
async function deletStudent(req, res) {
  const { id } = req.params;
  if (id) {
    try {
      const user = await studentModel.deleteOne({ _id: id });
      res
        .status(200)
        .json({ success: true, message: "user deleted", data: user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  } else {
    res.status(400).json({ success: false, message: "id is missing" });
  }
}
async function findStudent(req, res) {
  const { id } = req.params;
  console.log("visited");
  if (!id) {
    res.status(400).json({ success: false, message: "id is missing" });
  } else {
    try {
      const user = await studentModel.findOne({ _id: id });
      res
        .status(200)
        .json({ success: true, message: "user is find", data: user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  }
}
async function updateStudent(req, res) {
  const { id } = req.params;
  const { fullName, phone, email, courseId, address, userId } = req.body;
  const image = req.file.filename;
  if (!fullName || !phone || !email || !courseId || !address || !userId) {
    res
      .status(400)
      .json({ success: false, message: "all fields are compulsory" });
  } else {
    try {
      const newUser = await studentModel.updateOne(
        { _id: id },
        {
          $set: {
            fullName: fullName,
            phone: Number(phone),
            address: address,
            email: email,
            courseId: courseId,
            userId: userId,
            image: image,
          },
        }
      );
      res
        .status(201)
        .json({ success: true, message: "course added", data: { newUser } });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  }
}

// finding all student

async function allStudent(req, res) {
  const { userId } = req.body;
  if (!userId) {
    res
      .status(400)
      .json({ success: false, message: "all fields are compulsory" });
  } else {
    try {
      const users = await studentModel.find({userId:userId });

      res.status(200).json({ success: true, message:users });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "server error" });
    }
  }
}
module.exports = {
  addStudent,
  courseDetail,
  deletStudent,
  findStudent,
  updateStudent,
  allStudent
};
