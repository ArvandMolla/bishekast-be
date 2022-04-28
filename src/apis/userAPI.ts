import express from "express";
import userModel from "../models/userModel";
import createError from "http-errors";
import { JWTAuth, JWTAuthMiddleware } from "../auth/jwt";
import { checkCredentials } from "../util/checkCredentials";
import passport from "passport";
import { registrationEmail } from "../email/registrationMail";

const userRouter = express.Router();

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await checkCredentials(email, password);

    if (user) {
      const accessToken = await JWTAuth(user);
      res.send({ accessToken, user });
    } else {
      next(createError(401, "credentials are not correct!"));
    }
  } catch (error) {
    next(createError(500));
  }
});

userRouter.post("/register", async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      next(createError(400, "email already exists!"));
    } else {
      const newUser = new userModel(req.body);
      const { _id, name, email } = await newUser.save();
      res.status(201).send({ _id, name });
      registrationEmail(name, email);
    }
  } catch (error: any) {
    next(createError(500, error));
  }
});

userRouter.get("/is-loggedin", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const user = req.user;
    if (user) {
      res.status(200).send({ user });
    }
  } catch (error: any) {
    next(createError(error));
  }
});

userRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (error: any) {
    next(createError(500, error));
  }
});

// Google Login

userRouter.get(
  "/google-login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/google-redirect",
  passport.authenticate("google"),
  async (req: any, res, next) => {
    try {
      res
        .status(200)
        .redirect(
          `${process.env.FRONTEND_CLOUD_URL}/from-google?${req.user.token}`
        );
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
