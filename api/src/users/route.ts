import express, { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import jsonwebtoken from "jsonwebtoken";
const userRouter = express.Router();

userRouter.get(
  "/",
  async function getUserInfo(req: Request, res: Response, next: NextFunction) {

  }
);

export { userRouter };
