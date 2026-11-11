
import express from "express";
import taskRouter from "./routes/task.route.js";

const app = express()


app.use(express.json())

// this is for testing our server is running or not
app.get('/api/health',(req,res) => {
    res.status(200).json({
        success: true,
        message: "Server is up",
    })
})

// router middleware 

app.use("/api/tasks", taskRouter)

export default app