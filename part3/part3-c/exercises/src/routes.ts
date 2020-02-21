import express, { response } from "express";
import Person from "./models/person";
const routes = express.Router();

routes.get("/persons", (request, response) => {
  Person.find({}).then(person => {
    response.json(person.map(person => person.toJSON()));
  });
});
routes.get("/info", (request, response) => {
  Person.find({}).then(person => {
    response.end(`Person has info for ${person.length}
    ${new Date()}
      `);
  });
});

routes.get("/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

routes.post("/persons", (request, response, next) => {
  const { body } = request;

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
    .catch(error => next(error));
});

routes.put("/persons/:id", (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});
routes.delete("/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error));
});

const baseUrl = "/api";
export default (app: express.Application) => {
  app.use(baseUrl, routes);
};
