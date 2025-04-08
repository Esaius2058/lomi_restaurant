import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import "./config/passport.js";
import session from "express-session";
import router from "./routes/lomiRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using https
}));
//Initialize Passport
app.use(passport.initialize());
// Use express-session middleware for passport
app.use(passport.session());
//Routes
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});