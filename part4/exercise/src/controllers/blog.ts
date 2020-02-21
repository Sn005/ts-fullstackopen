import { Response, Request, NextFunction } from "express";
import Blog from "../models/blog";

export const index = (request: Request, response: Response) => {
  Blog.find({}).then(notes => {
    response.json(notes.map(note => note.toJSON()));
  });
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

export const store = (
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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.number
  });

  blog
    .save()
    .then(storedBlog => storedBlog.toJSON())
    .then(storedAndFormattedBlog => {
      response.json(storedAndFormattedBlog);
    })
    .catch(error => next(error));
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
