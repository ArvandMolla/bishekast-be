import jwt from "jsonwebtoken";
import createError from "http-errors";
import userModel from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { userInterface } from "../util/interfaces";
import { tokenPayload } from "../util/interfaces";

export const JWTAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    next(createError(401, "No authorization header was found!"));
  } else {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");

      const decodedToken: any = await verifyToken(token);

      const user = await userModel.findById(decodedToken._id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(createError(404, "User not found!"));
      }
    } catch (error) {
      next(createError(401, "Token is not valid!"));
    }
  }
};

export const JWTAuth = async (user: userInterface) => {
  if (user._id) {
    const accessToken = await generateJWT({ _id: user._id });
    return accessToken;
  }
};

const generateJWT = (payload: tokenPayload) =>
  new Promise((resolve, reject) => {
    if (process.env.JWT_SECRET) {
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "90d" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    }
  });

const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    if (process.env.JWT_SECRET) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken);
        }
      });
    }
  });
