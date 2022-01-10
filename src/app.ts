import express, { Application } from "express";
import cors from "cors";
import { createServer } from "http";
import allRouters from "./apis/index";

process.env.TS_NODE_DEV && require("dotenv").config();

const app: Application = express();

const whiteList = [
  process.env.FRONTEND_DEV_URL,
  process.env.FRONTEND_CLOUD_URL,
];
const corsOptions = {
  origin: function (origin: any, next: any) {
    console.log("ORIGIN ", origin);
    if (whiteList.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error("CORS TROUBLES!!!!!"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", allRouters);

const server = createServer(app);

export default server;
