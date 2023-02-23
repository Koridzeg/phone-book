import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";

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

app.listen(config.server.port, () => {
  Logging.info(`Server listening on port ${config.server.port}`);
});
