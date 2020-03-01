import express from "express";
import * as blog from "../controllers/blog";
const routes = express.Router();

routes.get("/", blog.index);

routes.post("/", blog.store);
routes.get("/:id", blog.show);

routes.put("/:id", blog.update);

routes.delete("/:id", blog.destroy);
export default routes;
