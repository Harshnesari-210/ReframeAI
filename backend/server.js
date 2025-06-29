import express from "express"
import cors from "cors"
import chatRoutes from "./routes/chat.js"
import dotenv from "dotenv"
import database from "./config/db.js"
import AuthRouter from "./routes/authentication.js"
import profileRouter from "./routes/profile.js"
import cookieParser from "cookie-parser"
import historyRouter from "./routes/history.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true // Enable credentials (cookies)
}));

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });



app.use('/chat', chatRoutes);
app.use("/auth",AuthRouter)
app.use("/auth",AuthRouter)
app.use("/user",profileRouter)
app.use("/user",historyRouter)
app.use("/user",historyRouter)

const PORT = process.env.PORT || 3000;

database().then(()=>{
    console.log("DB connected")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(()=>{
    console.log("DB failed to connect")
})

