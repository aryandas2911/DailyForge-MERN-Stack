import mongoose from "mongoose";

// task schema
const taskSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    requried: true,
  },
  description: {
    type: String,
    required: false,
  },
  tags: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Due", "Ongoing", "Completed"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// task model using schema
const taskModel = mongoose.model("Tasks", taskSchema);

export default taskModel;
