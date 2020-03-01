import express from "express";
import blogs from "./blogs";
import users from "./users";
import login from "./login";

const baseUrl = "/api";

export default (app: express.Application) => {
  app.use(`${baseUrl}/blogs`, blogs);
  app.use(`${baseUrl}/users`, users);
  app.use(`${baseUrl}/login`, login);
};
