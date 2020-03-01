import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Blog from "../models/blog";
import User from "../models/user";

export const index = async (request: Request, response: Response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  console.log(blogs[0]);
  response.json(blogs.map(blog => blog.toJSON()));
};

export const show = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
};

const getTokenFrom = (request: Request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

export interface TokenInterface {
  id: string;
}
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;

  if (!body.title) {
    return response.status(400).json({
      error: "title missing"
    });
  }
  try {
    const token = getTokenFrom(request);
    if (!token) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET as string
    ) as TokenInterface;
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);
    if (user === null) {
      return response.status(400).json({
        error: "user missing"
      });
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.number,
      user: user._id
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch (e) {
    next(e);
  }
};

export const update = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      if (updatedBlog) {
        response.json(updatedBlog.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
};

export const destroy = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
};
