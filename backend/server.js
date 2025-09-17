import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js";
import Transactions from "./src/routes/Transaction.js";
import Error from "./src/routes/Error.js"
import rateLimiter from "./src/middleware/rateLimiter.js";
import job from "./src/config/cron.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

if(process.env.NODE_ENV === "production")   job.start()

app.use(rateLimiter)
app.use(express.json());

app.get("/api/health", (req, res)=> {
    res.status(200).json({status:"ok"})
})
app.use("/api", Transactions);
app.use("/api", Error)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT: ", PORT);
    })
})