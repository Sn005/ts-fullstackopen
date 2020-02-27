import express from "express";
import notes from "./notes";
import users from "./users";

const baseUrl = "/api";

export default (app: express.Application) => {
  app.use(`${baseUrl}/notes`, notes);
  app.use(`${baseUrl}/users`, users);
};
