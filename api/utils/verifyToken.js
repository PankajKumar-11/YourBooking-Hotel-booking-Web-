import jwt from "jsonwebtoken"
import {createError} from "../utils/error.js"

export const verifyToken = (req, res, next) => {
  // Check both cookies and Authorization header
  const token = req.cookies?.access_token || 
    (req.headers.authorization?.startsWith("Bearer ") && 
     req.headers.authorization.split(" ")[1]);
  
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};