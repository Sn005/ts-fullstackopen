import express, { NextFunction } from "express";
const app = express();
const requestLogger = (
  request: express.Request,
  response: express.Response,
  next: NextFunction
) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type Notes = {
  id: number;
  content: string;
  important: boolean;
};
let notes: Notes[] = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascripttt",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return maxId + 1;
};

app.post("/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  };

  notes = notes.concat(note);

  response.json(note);
});
app.get("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);
  response.status(204).end();
});
const unknownEndpoint = (
  request: express.Request,
  response: express.Response
) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
