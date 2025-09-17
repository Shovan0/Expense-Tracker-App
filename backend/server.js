import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js";
import Transactions from "./src/routes/Transaction.js";
import Error from "./src/routes/Error.js"
import rateLimiter from "./src/middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(rateLimiter)
app.use(express.json());

app.use("/api", Transactions);
app.use("/api", Error)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT: ", PORT);
    })
})