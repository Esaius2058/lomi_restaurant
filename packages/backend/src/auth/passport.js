import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import prisma from "../utils/prisma/prisma"

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JWTStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: jwtPayload.id,
            },
        });

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

export default passport;