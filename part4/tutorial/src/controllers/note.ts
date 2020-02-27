import { Response, Request, NextFunction } from "express";
import Note from "../models/note";
import User from "../models/user";

export const index = async (request: Request, response: Response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });

  response.json(notes.map(note => note.toJSON()));
};

export const show = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
};

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    });
  }

  const user = await User.findById(body.userId);
  if (user === null) {
    return response.status(400).json({
      error: "user missing"
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  });

  try {
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    response.json(savedNote.toJSON());
  } catch (exception) {
    next(exception);
  }
};

export const update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      if (updatedNote) {
        response.json(updatedNote.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
};

export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
};
