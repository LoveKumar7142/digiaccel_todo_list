import mongoose from "mongoose";
import Task from "../models/task.model.js";

// It is returning the json of that is used in create task controller
export const createTaskService = async (taskData) => {
  return await Task.create(taskData);
};

export const getTasksService = async (search, dateRange) => {
  const filter = {};
  if (dateRange) {
    // A task at next Monday midnight belongs to the next week.
    filter.scheduledAt = { $gte: dateRange.start, $lt: dateRange.end };
  }

  if (search) {
    // Treat characters like dots and brackets as part of the keyword.
    const keyword = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = { $regex: keyword, $options: "i" };
    filter.$or = [{ title: match }, { description: match }];
  }

  return Task.find(filter).sort({ scheduledAt: 1, _id: 1 }).lean();
};

export const getWeeklySummaryService = async () => {
  const timezone = "Asia/Kolkata";

  return Task.aggregate([
    {
      $group: {
        // Group by Monday midnight in the same timezone used for the cards.
        _id: {
          $dateTrunc: { date: "$scheduledAt", unit: "week", startOfWeek: "monday", timezone },
        },
        openCount: { $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] } },
        completedCount: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        weekStart: "$_id",
        // Next Monday is the exclusive upper bound for this week's tasks.
        weekEndExclusive: { $dateAdd: { startDate: "$_id", unit: "week", amount: 1, timezone } },
        openCount: 1,
        completedCount: 1,
      },
    },
  ]);
};

export const getTaskByIdService = async (taskId) => {
  // it will check the format of id
  if (!mongoose.isObjectIdOrHexString(taskId)) {
    const error = new Error("Invalid task ID format");
    error.statusCode = 400; // 400 Bad Request
    throw error;
  }
  // 2. Query the database
  const task = await Task.findById(taskId);

  // 3. Handle task not found in DB
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

export const updateTaskService = async (taskId, updates) => {
  // Validate id format
  if (!mongoose.isObjectIdOrHexString(taskId)) {
    const error = new Error("Invalid Task ID format");
    error.statusCode = 400;
    throw error;
  }

  // 2. Update with validators enabled
  const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
    returnDocument: "after",
    runValidators: true,
  });

  // 3. Check if task exists
  if (!updatedTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return updatedTask;
};

export const deleteTaskService = async (taskId) => {
  if (!mongoose.isObjectIdOrHexString(taskId)) {
    const error = new Error("Invalid task ID format");
    error.statusCode = 400;
    throw error;
  }

  // Delete in one query. A null result means the task was already gone or never existed.
  const deletedTask = await Task.findByIdAndDelete(taskId);
  if (!deletedTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
};
