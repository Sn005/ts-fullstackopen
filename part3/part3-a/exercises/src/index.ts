import express from "express";
import config from "./config";
import logger from "./logger";
import routes from "./routes";
import listen from "./listen";
const app = express();

config(app);
logger(app);
routes(app);
listen(app);
