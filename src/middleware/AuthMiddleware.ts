import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthUser } from "../types";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const jwtSecrete: string = "GTYF75587%%$$##";
  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, jwtSecrete, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    req.user = user as AuthUser;
    next();
  });
};

export default authMiddleware;
