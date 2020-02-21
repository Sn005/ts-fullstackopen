import { Response, Request, NextFunction } from "express";
import Note from "../models/note";

export const getAllNotes = (request: Request, response: Response) => {
  Note.find({}).then(notes => {
    response.json(notes.map(note => note.toJSON()));
  });
};

export const getNote = (
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

export const postNote = (
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

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });

  note
    .save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote);
    })
    .catch(error => next(error));
};

export const putNote = (
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

export const deleteNote = (
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
