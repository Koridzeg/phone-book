import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.jeejd.mongodb.net/?retryWrites=true&w=majority`;
const FRONT_URL = process.env.FRONT_URL

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const JWT_SECRET = crypto.randomBytes(64).toString("hex");

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  jwt: {
    secret: JWT_SECRET,
  },
  front: {
    url: FRONT_URL,
  }
};
