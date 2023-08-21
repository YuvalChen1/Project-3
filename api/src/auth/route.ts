import express from "express";
import jsonwebtoken from "jsonwebtoken";
import zod from "zod";
import dotenv from "dotenv";
import { logger } from "../logger";
import signUp from "./handlers/signup";
import { login } from "./handlers/login";
import { ifUserExistsByEmailApi } from "../verify/checkIfUserExists";
dotenv.config();

const authRouter = express.Router();

export const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(12),
  firstName: zod.string().max(100),
  lastName: zod.string().max(100),
});

const loginSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

function middlewareLogin(req, res, next) {
  try {
    loginSchema.parse(req.body);
    return next();
  } catch (error) {
    return res.status(400).send("Error");
  }
}

authRouter.post("/login", middlewareLogin, async function (req, res, next) {
  const { email, password } = req.body;
  try {
    const { result, userRecord } = await login(email, password);
    if (!result) throw new Error();
    const signedToken = jsonwebtoken.sign(
      { userName: userRecord.email, id: userRecord.id, role: "admin" },
      process.env.SECRET,
      { expiresIn: "60m" }
    );
    res.json({ token: signedToken, userId: userRecord.id });
  } catch (error) {
    logger.error(error.message);
    return res.status(401).send("User is unauthorized");
  }
});

function middlewareSignIn(req, res, next) {
  try {
    signupSchema.parse(req.body);
    return next();
  } catch (error) {
    return res.status(400).send("Error");
  }
}

authRouter.post("/sign-up", middlewareSignIn, async function (req, res, next) {
  try {
    const { email } = req.body;
    const UserExists = await ifUserExistsByEmailApi(email);
    if (!UserExists) {
      await signUp(req.body);
      return res.json({ message: "user successfully added!" });
    } else {
      throw new Error("User Already Exists");
    }
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
});

export { authRouter };
