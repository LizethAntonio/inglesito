import { Request, Response, NextFunction } from "express";
import session from "express-session";

import InfanteType from "../types/infante.type";

declare module "express-session" {
  interface SessionData {
    user: InfanteType;
  }
}

export const sessionConfig = session({
  name: "session-cookie",
  secret: "secreto123",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    signed: true,
    maxAge: 10 * (60 * 1000),
  },
});

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction)=> {
  const {user} =  req.session;
  console.log(user);
  res.locals.user = user;
  next();
}