import express from "express";
import * as note from "../controllers/note";
const routes = express.Router();

routes.get("/", note.index);

routes.post("/", note.store);
routes.get("/:id", note.show);

routes.put("/:id", note.update);

routes.delete("/:id", note.destroy);
export default routes;
