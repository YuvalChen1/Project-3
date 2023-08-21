import express, { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import zod from "zod";
import { getAllVacationsApi } from "./handlers/getAllVacations";
import { addVacationApi } from "./handlers/addVacation";
import { editVacationByIdApi } from "./handlers/editVacation";
import { deleteVacationByIdApi } from "./handlers/deleteVacations";
const vacationsRouter = express.Router();

const vacationBody = zod.object({
  id: zod.number(),
  destination: zod.string().max(45),
  description: zod.string().max(100),
  startDate: zod.date(),
  endDate: zod.date(),
  price: zod.number().max(10000),
  image: zod.string().max(200),
});

vacationsRouter.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllVacationsApi();
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
      const id = req.query.q;
      if (!id) throw new Error("Error");
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
      const id = req.query.q;
      if (!id) throw new Error("Error");
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
