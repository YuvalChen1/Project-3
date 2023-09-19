import express from "express";
import zod from "zod";
import dotenv from "dotenv";
import { logger } from "../logger";
import { changePasswordApi } from "../user/handlers/password-change";
dotenv.config();

const userRouter = express.Router();

const changePasswordScheme = zod.object({
  password: zod.string().min(4),
  userId: zod.number(),
});

userRouter.put("/pw-change", async function (req, res, next) {
  try {
    const { password, userId } = req.body;

    changePasswordScheme.parse(req.body);
    await changePasswordApi(password, +userId);
    res.json({ message: "ok" });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
});

export { userRouter };
