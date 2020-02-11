import express from "express";
const routes = express.Router();
type Person = {
  id: number;
  name: string;
  number: string;
};
let persons: Person[] = [
  {
    id: 1,
    name: "hoge",
    number: "080-4545-7878"
  }
];
routes.get("/persons", (req, res) => {
  res.json(persons);
});
routes.get("/info", (req, res) => {
  res.end(`Phonebook has info for ${persons.length}
${new Date()}
  `);
});

routes.get("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
  return maxId + 1;
};

routes.post("/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing"
    });
  }

  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(person);

  response.json(persons);
});

routes.delete("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

const baseUrl = "/api";
export default (app: express.Application) => {
  app.use(baseUrl, routes);
};
