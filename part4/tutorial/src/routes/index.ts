import express from "express";
import notes from "./notes";
import users from "./users";
import login from "./login";

const baseUrl = "/api";

export default (app: express.Application) => {
  app.use(`${baseUrl}/notes`, notes);
  app.use(`${baseUrl}/users`, users);
  app.use(`${baseUrl}/login`, login);
};
