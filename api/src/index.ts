import express, { Request, Response, NextFunction } from "express";

import { logger } from "./logger";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import { vacationsRouter } from "./vacations/route";
import { authRouter } from "./auth/route";
import { addRequestId } from "./middleware/addRequestId";
import { addRequestStarted } from "./middleware/addRequestStarted";
import { addRequestFinished } from "./middleware/addRequestFinished";
import { followersRouter } from "./followers/route";
import { userRouter } from "./user/route";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(addRequestId);
app.use(addRequestStarted);
app.use(addRequestFinished);
app.use("/uploads", express.static("uploads"));
app.use("/uploads", cors());
app.get("/health-check", function (req, res, next) {
  res.send(`API IS OK ${new Date().toISOString()}`);
});

app.use("/auth", authRouter);
app.use(verifyAuthentication);
app.use("/vacations", vacationsRouter);
app.use("/followers", followersRouter);
app.use("/user", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({ message: err.message });
  console.log(err);
  res.status(500).send("Something went wrong");
});

app.listen(process.env.PORT, () => {
  logger.info({ message: `Api is running on Port ${process.env.PORT}` });
});

function verifyAuthentication(req: Request, res: Response, next) {
  const { authorization: token } = req.headers;

  jsonwebtoken.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      console.log(
        `${new Date().toISOString()} => requestId: ${res.getHeader(
          "x-request-id"
        )} | User Token invalid ${err.message}`
      );
      logger.error({ message: err.message });

      return res.status(401).send("Authentication error");
    } else {
      (req as any).currentUserName = decoded.userName;
      (req as any).currentUserId = decoded.id;
      (req as any).currentUserRole = decoded.role;

      console.log(
        `${new Date().toISOString()} => requestId: ${res.getHeader(
          "x-request-id"
        )} | User authenticated Successfully`
      );
      return next();
    }
  });
}
