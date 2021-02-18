import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import appointmentRouter from "./routes/appointments.routes";
import usersRouter from "./routes/users.routes";
import sessionsRouter from "./routes/sessions.routes";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";
import "./database/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use("/appointments", appointmentRouter);
app.use("/users", usersRouter);
app.use("/sessions", sessionsRouter);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);
app.listen(3333, () => console.log("Server started on port 3333"));
