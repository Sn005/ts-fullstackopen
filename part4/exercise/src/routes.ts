import express, { Response, Request } from "express";
import * as blog from "./controllers/blog";
const routes = express.Router();

routes.get("/", (request: Request, response: Response) => {
  blog.index(request, response);
});

routes.post("/", (request, response, next) => {
  blog.store(request, response, next);
});
routes.get("/:id", (request, response, next) => {
  blog.show(request, response, next);
});

routes.put("/:id", (request, response, next) => {
  blog.update(request, response, next);
});

routes.delete("/:id", (request, response, next) => {
  blog.destroy(request, response, next);
});
const baseUrl = "/api/blogs";
export default (app: express.Application) => {
  app.use(baseUrl, routes);
};
