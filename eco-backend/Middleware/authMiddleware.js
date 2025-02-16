import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const KEY_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "Access Denied. No token provided." });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    try {
        const decoded = jwt.verify(token, KEY_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Invalid Token" });
    }
};


export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({msg: "Unauthorized: Access forbidden"})
        }
        next()
    }
}