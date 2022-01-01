import mongoose from "mongoose";
import server from "./app";

process.env.TS_NODE_DEV && require("dotenv").config();

const port: number = 5000;

const { MONGO_CONNECTION } = process.env;

if (!MONGO_CONNECTION) {
  throw new Error("No Mongo Url defined!");
}

mongoose
  .connect(MONGO_CONNECTION)
  .then(() => {
    server.listen(port, () => {
      console.log("✅✅✅ Running on port", port);
    });
  })
  .catch((err) => console.log(err));
