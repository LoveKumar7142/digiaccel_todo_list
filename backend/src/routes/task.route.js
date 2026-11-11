import { Router } from "express";
import { createTask, deleteTask, getTaskById, getTasks, getWeeklySummary, updateTask } from "../controllers/task.controller.js";

const taskRouter = Router()

// Keep this above /:id so Express matches the summary route first.
taskRouter.get("/weekly-summary", getWeeklySummary);

// for task creating
taskRouter.post('/',createTask)

// list tasks or search by keyword
taskRouter.get("/", getTasks);

// get by id
taskRouter.get('/:id',getTaskById)

// patch by id
taskRouter.patch("/:id", updateTask)

// delete by id
taskRouter.delete("/:id", deleteTask);

export default taskRouter;

