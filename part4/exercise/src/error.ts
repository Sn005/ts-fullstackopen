import express, { NextFunction, json } from "express";
import { HttpError } from "http-errors";

const unknownEndpoint = (
  request: express.Request,
  response: express.Response
) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: HttpError,
  request: express.Request,
  response: express.Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token"
    });
  }
  next(error);
};

export default (app: express.Application) => {
  app.use(unknownEndpoint);
  app.use(errorHandler);
};
