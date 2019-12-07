import axios from "axios";
import { Note } from "./models";
const baseUrl = "http://localhost:3001/notes";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};
const getAll = async () => {
  const { data } = await axios.get<Note[]>(baseUrl);
  return data;
};

const create = async (newObject: Note) => {
  const config = {
    headers: { Authorization: token }
  };

  const { data } = await axios.post<Note>(baseUrl, newObject, config);
  return data;
};

const update = async (id: number, newObject: Note) => {
  const { data } = await axios.put<Note>(`${baseUrl}/${id}`, newObject);
  return data;
};

export default {
  getAll,
  create,
  update,
  setToken
};
