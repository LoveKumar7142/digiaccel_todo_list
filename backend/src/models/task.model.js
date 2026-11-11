import mongoose from "mongoose";


// this is model of task which is used to define the schema in mongodb so some user can not write anything esle outside this schema
const todoTask = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "{VALUE} is not a valid priority",
      },
      default: "medium",
      required: false,
    },
    status: {
      type: String,
      enum: {
        values: ["in_progress", "completed"],
        message: "{VALUE} is not a valid status",
      },
      default: "in_progress",
    },
  },
  { timestamps: true },
);

todoTask.index({ scheduledAt: 1 });

export default mongoose.model("Task", todoTask);
