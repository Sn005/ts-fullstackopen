import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password"
    });
  }
  const userForToken = {
    username: user.username,
    id: user._id
  };
  const token = jwt.sign(userForToken, process.env.SECRET as string);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
};
