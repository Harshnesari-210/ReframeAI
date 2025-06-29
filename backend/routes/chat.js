// // import express from "express"
// // import axios from "axios"
// // const chatRoutes = express.Router();


// // chatRoutes.post('/generate', async (req, res) => {
// //     const { prompt } = req.body;

// //     try {
// //         const response = await axios.post(process.env.ML_API_URL, { prompt });
// //         res.json({ output: response.data.response });
// //     } catch (error) {
// //         console.error('Error:', error.message);
// //         res.status(500).json({ error: 'Failed to generate prompt' });
// //     }
// // });

// // export default chatRoutes;


// import express from "express";
// import axios from "axios";
// import User from "../models/userAuth.js";
// import isAuth from "../middlewares/auth.js"; // Assuming you use authentication middleware


// const chatRoutes = express.Router();

// // POST /generate
// chatRoutes.post('/generate', isAuth, async (req, res) => {
//     const { prompt } = req.body;
//     const user = req.user; // Extract user from the auth middleware
//     console.log(user)
//     if (!prompt) {
//         return res.status(400).json({ error: "Prompt is required" });
//     }

//     try {
//         // Fetch response from the ML model
//         const response = await axios.post(process.env.ML_API_URL, { prompt });
//         const generatedResponse = response.data.response;

//         // Add the prompt and response to the user's history
//         User.history.push({ prompt, response: generatedResponse });
//         await user.save();

//         // Return the response
//         res.json({ output: generatedResponse });
//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({ error: "Failed to generate prompt" });
//     }
// });

// export default chatRoutes;

// import express from "express"
// import axios from "axios"
// const chatRoutes = express.Router();


// chatRoutes.post('/generate', async (req, res) => {
//     const { prompt } = req.body;

//     try {
//         const response = await axios.post(process.env.ML_API_URL, { prompt });
//         res.json({ output: response.data.response });
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: 'Failed to generate prompt' });
//     }
// });

// export default chatRoutes;

//working code
// import express from "express";
// import axios from "axios";
// import isAuth from "../middlewares/auth.js"
// const chatRoutes = express.Router();

// chatRoutes.post('/generate', isAuth, async (req, res) => {
//     const { prompt } = req.body;
//     const user=req.user

//     if (!prompt) {
//         return res.status(400).json({ error: "Prompt is required" });
//     }

//     try {
//         // Fetch response from the ML model
//         const response = await axios.post(process.env.ML_API_URL, { prompt });
//         console.log("ML API response:", response.data); // Log to debug structure

//         // Adjust to match the actual structure of the ML API response
//         const generatedResponse = response.data.response || response.data;
        
//         // Return the response
//         res.json({ output: generatedResponse });
//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({ error: "Failed to generate prompt" });
//     }
// });

// export default chatRoutes;


import express from "express";
import axios from "axios";
import isAuth from "../middlewares/auth.js";
import User from "../models/userAuth.js"; // Import User model

const chatRoutes = express.Router();

chatRoutes.post('/generate', isAuth, async (req, res) => {
    const { prompt } = req.body;
    const user = req.user; // Get the authenticated user

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        // Fetch response from the ML model
        const response = await axios.post(process.env.ML_API_URL, { prompt });
        console.log("ML API response:", response.data); // Log to debug structure

        // Adjust to match the actual structure of the ML API response
        const generatedResponse = response.data.response || response.data;

        // Save the prompt and response to the user's history
        user.history.push({ prompt, response: generatedResponse });
        await user.save(); // Save the updated user document

        // Return the response
        res.json({ output: generatedResponse });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to generate prompt" });
    }
});

export default chatRoutes;
