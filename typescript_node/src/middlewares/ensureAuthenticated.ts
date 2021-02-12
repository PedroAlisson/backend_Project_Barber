import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import authConfig from "../config/auth";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const headerToken = request.headers.authorization;

  if (!headerToken) {
    throw new AppError("Jwt is missing", 401);
  }
  const [, token] = headerToken.split(" ");
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWt token", 401);
  }
}
