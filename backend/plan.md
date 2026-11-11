Express setup → MongoDB connection → Task model → CRUD → search aur weekly summary

## 1. create a server

```powershell
mkdir backend
cd backend
npm init --y
npm install express dotenv
```

- create src folder then i create .env, .gitignore, app.js and server.js
- app.js -> all work of application
- server.js -> for running the server
- .env -> for environmental variable (dont show on git here is all important things are present)
- .gitignore -> this is for skip that file which is present in this file and i create this from this link -> https://www.toptal.com/developers/gitignore

- check that api using postman

## 2. create database connection - here we use the MongoDB database

- npm install mongoose
- i am also using mongoDB compass
- create MONGO_URI in .env then copy that string from mongoDB compass of my local mongoDB database
- now i create ->  src/config/db.js
- create connection then call that in server.js

## 3. create models

- create -> src/models/task.model.js
- create a task model which is used to create a new task ook and with this add index as well scheduledAt = 1

- Index: 1 is ascending index. When user will open a weekly card, MongoDB can search the task with the help of scheduledAt date range of that week.

- Model export: todoTask schema hai. mongoose.model() se Task model banta hai, jise controller mein import karke Task.create() aur Task.find() use karega.

## 4. POST /api/tasks

- create src/controllers/task.controller.js
  - createTask() -> createTaskService()
- create src/services/task.service.js -> createTaskService()

- create src/routes/task.routes.js - post createTask 

- check by postman

```json
{
    "title": "Complete Mongoose Integration",
    "description": "Create schema, service layer, and controller for task management",
    "scheduledAt": "2026-11-15T10:00:00.000Z",
    "priority": "high"
}
```

## 5. GET /api/tasks/:id

- In src/controllers/task.controller.js
  - create getTaskById() -> 
            - src/services/task.service.js -> getTaskByIdService()
- create src/routes/task.routes.js - get getTaskById
- check by postman -> http://localhost:5000/api/tasks/6af4d63104ec6a091c0ab5de

## 6. PATCH /api/tasks/:id

- In src/controllers/task.controller.js
  - create updateTask() -> 
            - src/services/task.service.js -> updateTaskService()
- create src/routes/task.routes.js - patch updateTask
- check by postman -> http://localhost:5000/api/tasks/6af4d63104ec6a091c0ab5de

## 7. DELETE /api/tasks/:id

- In src/controllers/task.controller.js
  - create deleteTask() ->
            - src/services/task.service.js -> deleteTaskService()
- in src/routes/task.route.js - delete deleteTask
- check by postman -> DELETE http://localhost:5000/api/tasks/<taskId>
  - use a test task id, no request body needed
  - first delete gives 200, same id again gives 404
  - invalid id gives 400

## 8. GET /api/tasks

- In src/controllers/task.controller.js
  - create getTasks() ->
            - src/services/task.service.js -> getTasksService()
- in src/routes/task.route.js - get getTasks
- search in title and description, sort by scheduledAt
- check by postman -> GET http://localhost:5000/api/tasks
  - use ?search=meeting to search by keyword
  - no matching task gives 200 with an empty array

## 9. GET /api/tasks/weekly-summary

- In src/controllers/task.controller.js
  - create getWeeklySummary() ->
            - src/services/task.service.js -> getWeeklySummaryService()
- in src/routes/task.route.js - get weekly-summary before /:id
- use MongoDB 5.0+ aggregation to group scheduledAt by Monday in Asia/Kolkata
- count in_progress as open and completed as completed for each week
- return weekStart and weekEndExclusive in UTC, use IST to display the dates
- check by postman -> GET http://localhost:5000/api/tasks/weekly-summary
  - Sunday 11:59 PM IST and Monday 12:00 AM IST go in different weeks
  - update a task status and check both counts again
  - no tasks gives 200 with an empty array

## 10. GET /api/tasks with date range

- In src/controllers/task.controller.js
  - update getTasks() to read from and to as UTC timestamps
            - src/services/task.service.js -> use scheduledAt with $gte and $lt
- when user opens a weekly card, send weekStart as from and weekEndExclusive as to
- check by postman -> GET http://localhost:5000/api/tasks?from=2026-11-08T18:30:00.000Z&to=2026-11-15T18:30:00.000Z
  - task at from is included, task at to belongs to the next week
  - missing or invalid boundary gives 400 when a date filter is used
  - search can be used with the date range
