import express, { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { addVacationSubscribeApi } from "./handlers/addVacationSubscribe";
import { deleteVacationSubscribeApi } from "./handlers/deleteVacationSubscribe";

const followersRouter = express.Router();

followersRouter.post(
  "/new",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, vacationId } = req.body;
      if (!userId || !vacationId)
        throw new Error("Invalid User Id or vacation Id");
      await addVacationSubscribeApi(userId, vacationId);
      res.json({ message: "ok" });
    } catch (error) {
      logger.error(error.message);
      return next(error);
    }
  }
);

followersRouter.delete(
  "/delete",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, vacationId } = req.body;
      if (!userId || !vacationId)
        throw new Error("Invalid User Id or vacation Id");
      await deleteVacationSubscribeApi(userId, vacationId);
      res.json({ message: "ok" });
    } catch (error) {
      logger.error(error.message);
      return next(error);
    }
  }
);

export { followersRouter };
