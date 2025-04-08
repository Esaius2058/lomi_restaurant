import passport from "passport";

export async function ensureAuthenticated(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            console.error("JWT error:", err);
            return res.status(401).json({ message: "Token Error", error: err.message });
        }

        if(!user){
            const message = info?.message || "Unauthorized - Invalid token";
            console.error("Authentication failed:", message);
            return res.status(401).json({ message });
        }

        req.user = user;
        return next();
    })(req, res, next);
}

export async function ensureAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        console.error("Authorization error: User is not an admin");
        return res.status(401).json({ message: "Unauthorized Admin" });
    }

    return next();
}