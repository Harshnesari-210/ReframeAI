import  User  from "../models/userAuth.js";
import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        console.error("Token is missing.");
        return res.status(400).json({ status: false, message: "Please log in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET || "RENTLINL2110");
        console.log("Decoded Token:", decoded); 
        const user = await User.findById(decoded._id);

        if (!user) {
            console.error("User not found.");
            return res.status(400).json({ status: false, message: "User not found. Please register." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Failed:", error); // Log error details
        return res.status(400).json({ status: false, message: "Invalid or expired token" });
    }
}


export default isAuth;