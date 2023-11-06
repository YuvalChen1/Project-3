import express from "express";
import jsonwebtoken from "jsonwebtoken";
import zod from "zod";
import dotenv from "dotenv";
import { logger } from "../logger";
import signUp from "./handlers/signup";
import { login } from "./handlers/login";
import { ifUserExistsByEmailApi } from "../verify/checkIfUserExists";
import { changePasswordApi } from "../user/handlers/password-change";
dotenv.config();

const authRouter = express.Router();

export const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(12),
  firstName: zod.string().max(100),
  lastName: zod.string().max(100),
});

const passwordScheme = zod.object({
  password: zod.string().min(4),
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
  const tokenExpiration = Date.now() + 60 * 60 * 1000;
  try {
    const { result, userRecord } = await login(email, password);
    if (!result) throw new Error();
    const signedToken = jsonwebtoken.sign(
      { userName: userRecord.email, id: userRecord.id, role: userRecord.role },
      process.env.SECRET,
      { expiresIn: "60m"}
    );
    res.json({
      token: signedToken,
      userRecord: userRecord,
      tokenExpiration: tokenExpiration,
    });
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
    return res.status(400).send("Error Bad Request");
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
      return res.status(409).send("User Already Exists");
    }
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
});

authRouter.post("/pw-change", async function (req, res, next) {
  try {
    const { password, userId } = req.body;
    passwordScheme.parse(password);
    await changePasswordApi(password, userId);
    res.json({ message: "ok" });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
});

export { authRouter };
