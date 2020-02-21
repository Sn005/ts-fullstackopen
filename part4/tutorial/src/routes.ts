import express, { Response, Request } from "express";
import * as note from "./controllers/note";
const routes = express.Router();

routes.get("/", (request: Request, response: Response) => {
  note.getAllNotes(request, response);
});

routes.post("/", (request, response, next) => {
  note.postNote(request, response, next);
});
routes.get("/:id", (request, response, next) => {
  note.getNote(request, response, next);
});

routes.put("/:id", (request, response, next) => {
  note.putNote(request, response, next);
});

routes.delete("/:id", (request, response, next) => {
  note.deleteNote(request, response, next);
});
const baseUrl = "/api/notes";
export default (app: express.Application) => {
  app.use(baseUrl, routes);
};
