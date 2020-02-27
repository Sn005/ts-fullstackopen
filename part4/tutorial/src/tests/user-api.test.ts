import dotenv from "dotenv";
import supertest from "supertest";
import express from "express";
import db from "../db";
import config from "../config";
import listen from "../listen";
import routes from "../routes";
import User from "../models/user";
dotenv.config();
const app = express();

db({ db: process.env.TEST_MONGODB_URI as string });
config(app);
routes(app);
listen(app);

const api = supertest(app);
jest.setTimeout(30000);

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "root", password: "sekret" });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });
});
