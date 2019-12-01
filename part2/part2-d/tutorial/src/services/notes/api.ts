import axios from "axios";
import { Note } from "./models";
const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const { data } = await axios.get<Note[]>(baseUrl);
  return data;
};

const create = async (newObject: Note) => {
  const { data } = await axios.post<Note>(baseUrl, newObject);
  return data;
};

const update = async (id: number, newObject: Note) => {
  const { data } = await axios.put<Note>(`${baseUrl}/${id}`, newObject);
  return data;
};

export default {
  getAll: getAll,
  create: create,
  update: update
};
