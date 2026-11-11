import {
  createTaskService,
  deleteTaskService,
  getTaskByIdService,
  getTasksService,
  getWeeklySummaryService,
  updateTaskService,
} from "../services/task.service.js";

// this is create task controller which is used to create task
export const createTask = async (req, res) => {
  const { title, description, scheduledAt, priority } = req.body ?? {};
  const invalidTitle = typeof title !== "string" || !title.trim();
  const invalidDescription =
    description !== undefined && typeof description !== "string";

  if (invalidTitle || invalidDescription) {
    return res.status(400).json({
      success: false,
      message: "Please Enter valid Input",
    });
  }

  try {
    // here we call that create task
    const task = await createTaskService({
      title: title.trim(),
      description: description?.trim(),
      scheduledAt,
      priority,
    });

    res.status(201).json({
      success: true,
      message: "Task created Successfully",
      data: task,
    });
  } catch (error) {
    // req side error
    if (error.name == "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    // internal server error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// for get task by id
export const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    // call the service of getting task
    const task = await getTaskByIdService(taskId);

    res.status(200).json({
      success: true,
      message: "Task fetch successfully",
      data: task,
    });
  } catch (error) {
    // 1. Handle custom status codes attached by the service (e.g., 400 for bad ID, 404 for not found)
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    // 2. Handle native Mongoose CastError (in case an invalid ObjectId bypasses service checks)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Invalid format for field: ${error.path}`,
      });
    }

    // 3. Fallback for unhandled/unexpected runtime errors
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// for getTask search
const parseUtcTimestamp = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)) {
    return null;
  }

  const date = new Date(value);
  const normalized = value.includes(".") ? value : value.replace("Z", ".000Z");
  // Reject calendar dates that JavaScript rolls into the next month.
  return Number.isFinite(date.getTime()) && date.toISOString() === normalized ? date : null;
};

export const getTasks = async (req, res) => {
  const { search, from, to } = req.query;
  if (search !== undefined && typeof search !== "string") {
    return res.status(400).json({
      success: false,
      message: "Search must be a single string",
    });
  }

  let dateRange;
  if (from !== undefined || to !== undefined) {
    const start = parseUtcTimestamp(from);
    const end = parseUtcTimestamp(to);
    if (!start || !end || start >= end) {
      return res.status(400).json({
        success: false,
        message: "Provide valid UTC timestamps for from and to, with from before to",
      });
    }

    dateRange = { start, end };
  }

  try {
    const tasks = await getTasksService(search?.trim(), dateRange);
    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getWeeklySummary = async (req, res) => {
  try {
    const weeks = await getWeeklySummaryService();
    return res.status(200).json({ success: true, data: weeks });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// for task updation

export const updateTask = async (req, res) => {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({
      success: false,
      message: "Request body must be a JSON object",
    });
  }
  const allowedFields = [
    "title",
    "description",
    "scheduledAt",
    "priority",
    "status",
  ];
  const fields = Object.keys(body);

  // any field not present
  if (
    fields.length === 0 ||
    fields.some((field) => !allowedFields.includes(field))
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field and use only updatable fields",
    });
  }


  // title is missing

  if (
    "title" in body &&
    (typeof body.title !== "string" || !body.title.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Title must be a non-empty string",
    });
  }

  // description is not in the form of string
  if ("description" in body && typeof body.description !== "string") {
    return res.status(400).json({
      success: false,
      message: "Description must be a string",
    });
  }

  const updates = {};

  for (const field of fields) {
    const value = body[field];
    updates[field] =
      field === "title" || field === "description" ? value.trim() : value;
  }
  const taskId = req.params.id || req.params.taskId;

  try {
    const updated = await updateTaskService(taskId, updates)
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updated,
    });

  } catch (error) {
    // Custom service-level errors (400 bad ID, 404 not found)
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    // Mongoose enum or schema validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // Invalid ObjectId format thrown by Mongoose
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Invalid format for field: ${error.path}`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// for deletion
export const deleteTask = async (req, res) => {
  try {
    await deleteTaskService(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    if (error.statusCode === 400 || error.statusCode === 404) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
