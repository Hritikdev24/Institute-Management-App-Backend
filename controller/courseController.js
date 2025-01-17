const { courseModel } = require("../model/courseModel.js");
const{studentModel}=require("../model/studentModel.js")

//add course

async function addCourse(req, res) {
  const { courseName, price, description, startDate, endDate, userId } =
    req.body;
  const image = req.file.filename;

  if (
    !courseName ||
    !price ||
    !description ||
    !startDate ||
    !endDate ||
    !userId
  ) {
    res
      .status(400)
      .json({ success: false, message: "all fields are compulsory" });
  } else {
    try {
      const newUser = await courseModel.create({
        courseName: courseName,
        price: Number(price),
        description: description,
        startDate: startDate,
        endDate: endDate,
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

// all courses

async function allCourses(req, res) {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).json({ success: false, message: "you need to login" });
  } else {
    try {
      const courses = await courseModel.find({ userId: userId });
      res.status(200).json({ success: true, message: courses });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  }
}

// perticular course

async function perticularCourse(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ success: false, message: "id is compulsory" });
  } else {
    try {
      const course = await courseModel.findOne({ _id: id });
      res.status(200).json({ success: true, message: course });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, message: "something went wrong" });
    }
  }
}

// delete course

async function delteCourse(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ success: false, message: "id is compulsory" });
  } else {
    try {
      const student=await studentModel.deleteMany({courseId:id})
      const course = await courseModel.deleteOne({ _id: id });
      res.status(200).json({ success: true, message: course });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, message: "something went wrong" });
    }
  }
}

async function editeCourse(req, res) {
  const { id } = req.params;
  console.log(id);
  const { courseName, price, description, startDate, endDate, userId } =
    req.body;
  const image = req.file.filename;
  if (!id) {
    res.status(400).json({ success: false, message: "id is compulsory" });
  } else {
    try {
      const course = await courseModel.updateOne(
        { _id: id },
        {
          $set: {
            courseName: courseName,
            price: Number(price),
            description: description,
            startDate: startDate,
            endDate: endDate,
            userId: userId,
            image: image,
          },
        }
      );
      res.status(200).json({ success: true, message: course });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, message: "something went wrong" });
    }
  }
}

module.exports = {
  addCourse,
  allCourses,
  perticularCourse,
  delteCourse,
  editeCourse,
};
