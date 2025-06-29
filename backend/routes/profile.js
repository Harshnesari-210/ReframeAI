import express from "express"
import isAuth from "../middlewares/auth.js"

const profileRouter=express.Router()

// In your routes file (e.g., authRouter.js)

profileRouter.get("/profile", isAuth, async (req, res) => {
    const user = req.user; // This is set by the isAuth middleware
    if (!user) {
        return res.status(400).json({
            status: false,
            message: "User not found. Please register.",
        });
    }

    // Send user profile data
    res.status(200).json({
        success: true,
        user: {
            firstName: user.firstName,
            email: user.email,
            createdAt: user.createdAt,
        },
    });
});



export default profileRouter;