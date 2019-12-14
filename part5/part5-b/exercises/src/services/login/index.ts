// import axios from "axios";
import { AuthRequest, AuthResponse } from "./model";
// const baseUrl = "/api/login";

const mockAuth = (authRequest: AuthRequest): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    if (!authRequest.username || !authRequest.password) {
      reject();
    }
    resolve({
      name: "hoge",
      token: "secret"
    });
  });
};

const login = async (authRequest: AuthRequest) => {
  const response = await mockAuth(authRequest);
  return response;
};

export default { login };
