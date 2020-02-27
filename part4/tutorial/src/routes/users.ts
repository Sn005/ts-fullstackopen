import express, { Response, Request } from "express";
import * as user from "../controllers/user";
const routes = express.Router();

routes.get("/", user.index);
routes.post("/", user.create);

export default routes;
