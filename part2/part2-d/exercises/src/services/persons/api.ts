import axios from "axios";
import { Person } from "./models";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const { data } = await axios.get<Person[]>(baseUrl);
  return data;
};

const create = async (newObject: Person) => {
  const { data } = await axios.post<Person>(baseUrl, newObject);
  return data;
};

const update = async (id: number, newObject: Person) => {
  const { data } = await axios.put<Person>(`${baseUrl}/${id}`, newObject);
  return data;
};

const destroy = async (id: number) => {
  await axios.delete<Person[]>(`${baseUrl}/${id}`);
};
export default {
  getAll,
  create,
  update,
  destroy
};
