const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

async function dbConnect() {
  const mongoUri = "mongodb+srv://hritikGangadhar:Hritik%4011@cluster0.rgkrs.mongodb.net/myDatabase?retryWrites=true&w=majority"; 
  if (!mongoUri) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1); // Exit the process if MONGO_URI is missing
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database is successfully connected!");
  } catch (err) {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1); // Exit the process on connection failure
  }
}

module.exports = { dbConnect };
