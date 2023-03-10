import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import cors from "cors";
import authRoute from "./routes/auth";
import phoneBookRoute from "./routes/phonebook";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();
const router = express();

mongoose.set("strictQuery", false);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.mongo.url);
    Logging.info("Connected to MongoDB");
  } catch (error) {
    Logging.error("unable to connect");
  }
};

connectToMongoDB();

app.use(errorMiddleware)

app.listen(config.server.port, () => {
  Logging.info(`Server listening on port ${config.server.port}`);
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/phonebook", phoneBookRoute);
