import dotenv from "dotenv";
import mongoose from "mongoose";
import supertest from "supertest";
import express from "express";
import db from "../db";
import config from "../config";
import error from "../error";
import listen from "../listen";
import routes from "../routes";
dotenv.config();
const app = express();

db({ db: process.env.TEST_MONGODB_URI as string });
config(app);
routes(app);
listen(app);

const api = supertest(app);
jest.setTimeout(30000);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
// test("there are four notes", async () => {
//   const response = await api.get("/api/notes");

//   expect(response.body.length).toBe(4);
// });

// test("the first note is about HTTP methods", async () => {
//   const response = await api.get("/api/notes");

//   expect(response.body[0].content).toBe("HTML is easy");
// });
afterAll(async () => {
  await mongoose.connection.close();
});
