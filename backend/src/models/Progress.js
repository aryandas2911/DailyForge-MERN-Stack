import mongoose from "mongoose";

// Progress schema
const progressSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  completedTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks",
    },
  ],
});

// ensures each user can have only one doc per day
progressSchema.index({ userId: 1, date: 1 }, { unique: true });

// Progress model using schema
const progressModel = mongoose.model("Progress", progressSchema);

export default progressModel;
