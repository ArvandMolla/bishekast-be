import express from "express";
import userRouter from "./userAPI";

const allRouters = express.Router();

allRouters.use("/user", userRouter);

export default allRouters;
