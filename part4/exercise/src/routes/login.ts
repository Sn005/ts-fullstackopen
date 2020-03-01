import express from "express";
import * as login from "../controllers/login";
const routes = express.Router();

routes.post("/", login.store);
export default routes;
