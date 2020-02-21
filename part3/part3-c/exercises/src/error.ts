import express, { NextFunction } from "express";
import { HttpError } from "http-errors";

export default (app: express.Application) => {
  const unknownEndpoint = (
    request: express.Request,
    response: express.Response
  ) => {
    response.status(404).send({ error: "unknown endpoint" });
  };
  app.use(unknownEndpoint);

  const errorHandler = (
    error: HttpError,
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    console.error(error.message);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
  };
  app.use(errorHandler);
};
