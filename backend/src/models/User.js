import mongoose from "mongoose";

// User schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// User schema model
const userModel = mongoose.model("User", userSchema);

export default userModel;
