import express, { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import zod from "zod";
import { addVacationApi } from "./handlers/addVacation";
import { editVacationByIdApi } from "./handlers/editVacation";
import { deleteVacationByIdApi } from "./handlers/deleteVacations";
import { getAllVacationsByUserIdApi } from "./handlers/getAllVacationsByUserId";
const vacationsRouter = express.Router();

const vacationBody = zod.object({
  destination: zod.string().max(45),
  description: zod.string().max(100),
  startDate: zod.string(),
  endDate: zod.string(),
  price: zod.number().max(10000),
  image: zod.string().max(200),
});

vacationsRouter.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const userId = +req.query.userId;
      if (typeof userId !== "number") throw new Error("Invalid User Id");
      const result = await getAllVacationsByUserIdApi(userId);
      res.json(result);
    } catch (error) {
      logger.error(error.message);
    }
  }
);

vacationsRouter.post(
  "/new",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.body;

      vacationBody.parse(req.body);
      await addVacationApi(req.body);
      res.json({ message: "ok" });
    } catch (error) {
      logger.error(error.message);
      return next(error);
    }
  }
);

vacationsRouter.put(
  "/edit",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.query;
      if (!id) throw new Error("Invalid Vacation Id");
      vacationBody.parse(req.body);
      await editVacationByIdApi(id, req.body);
      res.json({ message: "ok" });
    } catch (error) {
      logger.error(error.message);
      return next(error);
    }
  }
);

vacationsRouter.delete(
  "/delete",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.query.id;
      if (!id) throw new Error("Invalid Vacation Id");
      await deleteVacationByIdApi(id);
      return res
        .status(200)
        .json({ message: "Vacation deleted successfully." });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
);

export { vacationsRouter };
