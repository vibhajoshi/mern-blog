import jwt from "jsonwebtoken";
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    // 1. Get token from cookies
    const token = req.cookies.access_token;

    // 2. Check if token exists
    if (!token) {
        return next(errorHandler(401, 'Authentication required - No token provided'));
    }

    // 3. Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Different error messages based on JWT error type
            if (err.name === 'TokenExpiredError') {
                return next(errorHandler(401, 'Session expired - Please log in again'));
            }
            if (err.name === 'JsonWebTokenError') {
                return next(errorHandler(401, 'Invalid token - Please authenticate'));
            }
            return next(errorHandler(401, 'Authentication failed'));
        }

        // 4. Attach user to request
        req.user = decoded;
        next();
    });
};

// Optional: Add role-based verification
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.userId || req.user.isAdmin) {
            next();
        } else {
            return next(errorHandler(403, 'You are not authorized'));
        }
    });
};

// Optional: Admin verification
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(errorHandler(403, 'Admin access required'));
        }
    });
};