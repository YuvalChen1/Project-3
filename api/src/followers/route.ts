import express, { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { addVacationSubscribeApi } from "./handlers/addVacationSubscribe";

const followersRouter = express.Router();

followersRouter.post(
  "/new",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, vacationId } = req.body;
      if (typeof userId !== "number" && typeof vacationId !== "number")
        throw new Error("Invalid User Id or vacation Id");
      await addVacationSubscribeApi(userId, vacationId);
      res.json({ message: "ok" });
    } catch (error) {
      logger.error(error.message);
      return next(error);
    }
  }
);

// vacationsRouter.delete(
//   "/delete",
//   async function (req: Request, res: Response, next: NextFunction) {
//     try {
//       const id = req.query.q;
//       if (!id) throw new Error("Error");
//       await deleteVacationByIdApi(id);
//       return res
//         .status(200)
//         .json({ message: "Vacation deleted successfully." });
//     } catch (error) {
//       logger.error(error.message);
//       return res.status(500).json({ error: "Internal server error." });
//     }
//   }
// );

export { followersRouter };
