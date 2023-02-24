import { NextFunction, Request, Response } from "express";
import Logging from "../library/Logging";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logging.error(error.stack);
  res.status(500).json({
    error: {
      message: error.message,
    },
  });
};
