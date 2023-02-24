import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/authrequest";
import { IUser } from "../interfaces/user.model";


export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as IUser;
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
