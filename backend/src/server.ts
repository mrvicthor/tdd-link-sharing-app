import express from "express";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

const app = express();
const port = 8080;

dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.use(compression());

app.use(cookieParser());

app.use(bodyParser.json());

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.json({ message: "Link created successfully", data: req.body });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: Error) => console.error(`MongoDB connection error: ${err}`));

app.use("/", router());
