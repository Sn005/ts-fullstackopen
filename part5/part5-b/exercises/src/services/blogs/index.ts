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

const update = async (newObject: Blog) => {
  const { data } = await axios.put<Blog>(
    `${baseUrl}/${newObject.id}`,
    newObject
  );
  return data;
};
const remove = async (id: number) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
export default {
  getAll,
  create,
  update,
  remove,
  setToken
};
