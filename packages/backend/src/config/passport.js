import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import prisma from "../utils/prisma.js"; // Adjust path as needed
import dotenv from "dotenv";

dotenv.config(); // In case it's not already loaded

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  ignoreEpiration: false
};

passport.use(
  new JWTStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.id },
      });

      if (!user) {
        console.log('User not found for ID:', jwtPayload.id);
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      console.error("Error in passport strategy:", error);
      return done(error, false);
    }
  })
);