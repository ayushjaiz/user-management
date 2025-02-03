import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectMongoDB } from "./config/mongo";
import { initializeWorker } from "./services/queue/worker";
const port = process.env.APP_PORT || 3001;


app.listen(port, async () => {
    await connectMongoDB();
    await initializeWorker();
    console.log('App running on port ' + port);
})
