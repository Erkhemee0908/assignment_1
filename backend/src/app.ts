import express from "express";
import { connectToDatabase } from "./services/database.service"
import { namesRouter } from "./routes/names.router";

const app = express();

connectToDatabase()
    .then(() => {
        app.use("/names", namesRouter);
    })

export default app