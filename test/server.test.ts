import request from "supertest";
import app from "../src/server";
import mongoose from "mongoose";
import { UserModel } from "../src/db/models/users";
import { UserSchema } from "../src/db/models/users";

beforeAll(async () => {
  mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await UserModel.deleteMany({});
});

describe("GET /", () => {
  it("should return 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});

describe("POST /", () => {
  it("returns back the JSON payload", async () => {
    const payload = { name: "https://www.facebook.com/victoreleanya" };
    const response = await request(app)
      .post("/")
      .send(payload)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Link created successfully",
      data: payload,
    });
  });
});
