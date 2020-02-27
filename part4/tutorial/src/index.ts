import dotenv from "dotenv";
import express from "express";
import config from "./config";
import db from "./db";
import error from "./error";
import listen from "./listen";
import logger from "./logger";
import routes from "./routes";

dotenv.config();
const app = express();

const dbUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
db({ db: dbUrl as string });
config(app);
logger(app);
routes(app);
error(app);
listen(app);
