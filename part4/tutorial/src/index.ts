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

db({ db: process.env.MONGODB_URI as string });
config(app);
logger(app);
routes(app);
error(app);
listen(app);
