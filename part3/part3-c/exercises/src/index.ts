import express from "express";
import dotenv from "dotenv";
import db from "./db";
import config from "./config";
import logger from "./logger";
import routes from "./routes";
import error from "./error";
import listen from "./listen";

dotenv.config();
const app = express();

db({ db: process.env.MONGODB_URI as string });
config(app);
logger(app);
routes(app);
error(app);
listen(app);
