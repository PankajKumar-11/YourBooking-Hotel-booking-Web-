import jwt from "jsonwebtoken"
import {createError} from "../utils/error.js"

export const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : null;
    
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
    
    // Add console.log for debugging
    console.log("Verifying token:", token.substring(0, 20) + "...");
    
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        return next(createError(403, "Token is not valid!"));
      }
      
      req.user = user;
      next();
    });
  } catch (err) {
    return next(createError(500, "Authentication error"));
  }
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