// import axios from "axios";
import { Credentials, Response } from "./model";
// const baseUrl = "/api/login";

const mockAuth = (credentials: Credentials): Promise<Response> => {
  return new Promise((resolve, reject) => {
    if (!credentials.username || !credentials.password) {
      reject();
    }
    resolve({
      name: "hoge",
      token: "secret"
    });
  });
};

const login = async (credentials: Credentials) => {
  const response = await mockAuth(credentials);
  return response;
};

export default { login };
