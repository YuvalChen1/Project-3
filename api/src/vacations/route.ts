import express, { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import zod from "zod";
import { addVacationApi } from "./handlers/addVacation";
import { editVacationByIdApi } from "./handlers/editVacation";
import { deleteVacationByIdApi } from "./handlers/deleteVacations";
import { getAllVacationsByUserIdApi } from "./handlers/getAllVacationsByUserId";
import multer from "multer";
import fs from "fs";
import { getVacationByIdApi } from "./handlers/getVacationById";
const path = require("path");

const vacationsRouter = express.Router();

const vacationBody = zod.object({
  destination: zod.string().max(45),
  description: zod.string().max(1000),
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

function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const role = (req as any).currentUserRole;
    if (role === "admin") return next();
    throw new Error();
  } catch (error) {
    return res.status(403).send();
  }
}

async function deleteVacationImage(imageURL: any) {
  const imagePath = path.join(__dirname, "../", imageURL).replace("\src", "");
  try {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log("Image deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

function generateUniqueFilename() {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const uniqueFilename = `${timestamp}-${randomString}`;
  return uniqueFilename;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueFilename = generateUniqueFilename();
    cb(null, uniqueFilename + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

vacationsRouter.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image provided" });
  }
  const imageURL = `/uploads/${req.file.filename}`;
  res.status(200).json(imageURL);
});

vacationsRouter.post(
  "/new",
  isAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { destination, description, startDate, endDate, price, image } =
        req.body;
      const vacationData = {
        destination,
        description,
        startDate,
        endDate,
        price,
        image,
      };
      vacationBody.parse(vacationData);
      await addVacationApi(vacationData);
      res.json({ message: "ok" });
    } catch (error) {
      logger.error(error.message);
      return next(error);
    }
  }
);

vacationsRouter.put(
  "/edit",
  isAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      vacationBody.parse(req.body);
      await editVacationByIdApi(req.body);
      res.json({ message: "ok" });
    } catch (error) {
      logger.error(error.message);
      return next(error);
    }
  }
);

vacationsRouter.delete(
  "/delete",
  isAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.query.id;
      if (!id) throw new Error("Invalid Vacation Id");
      const vacationImage = (await getVacationByIdApi(id)) as any;
      await deleteVacationImage(vacationImage[0].image);

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
