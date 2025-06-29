import express from "express";
import isAuth from "../middlewares/auth.js";

const historyRouter = express.Router();

// Endpoint to get user's history
historyRouter.get("/history", isAuth, async (req, res) => {
    const { history } = req.user;

    if (!history || history.length === 0) {
        return res.status(200).json({
            message: "No history available"
        });
    }

    res.status(200).json({
        success:true,
        history
    });
});

historyRouter.delete("/history/:id", isAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        // Ensure that the user document is fetched correctly
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the history record exists
        const recordExists = user.history.some(record => record._id.toString() === id);
        if (!recordExists) {
            return res.status(404).json({ error: "Record not found" });
        }

        // Remove the specific record from the user's history array in the database
        const updateResult = await user.updateOne({
            $pull: { history: { _id: id } }
        });

        // Check if the update was successful
        if (updateResult.nModified === 0) {
            return res.status(400).json({ error: "Failed to delete the record" });
        }

        res.status(200).json({ success: true, message: "Record deleted permanently from database" });
    } catch (error) {
        console.error(error);  // Debugging output
        res.status(500).json({ error: "An error occurred while deleting the record." });
    }
});



export default historyRouter;
