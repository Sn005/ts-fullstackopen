import express from "express";
import morgan from "morgan";
export default (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  morgan.token("body", function getId(req) {
    return JSON.stringify(req.body);
  });
  app.use(morgan(":method :url :status :response-time :body"));
};
