import express, { Request, Response, NextFunction } from "express";

const tokenExtractor = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    (request as Request & { token: string }).token = authorization.substring(7);
  } else {
    next(null);
  }
};
// interface MyRequest extends Request {
//   boo: string;
// }
// const weirdMiddleware = (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   (request as MyRequest).boo = "boo";
//   next();
// };
export default (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(tokenExtractor);
};
