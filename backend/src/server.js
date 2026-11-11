import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;



// database connected here and server is running here
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
}).catch((error)=>{
    console.log(error)
    process.exit(1)
});
