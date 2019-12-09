import axios from "axios";
import { Blog } from "./model";
const baseUrl = "http://localhost:3001/blogs";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};
const getAll = async () => {
  const { data } = await axios.get<Blog[]>(baseUrl);
  return data;
};

const create = async (newObject: Blog) => {
  const config = {
    headers: { Authorization: token }
  };

  const { data } = await axios.post<Blog>(baseUrl, newObject, config);
  return data;
};

const update = async (id: number, newObject: Blog) => {
  const { data } = await axios.put<Blog>(`${baseUrl}/${id}`, newObject);
  return data;
};

export default {
  getAll,
  create,
  update,
  setToken
};
