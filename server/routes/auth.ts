import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login-failure` }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL!);
  }
);

export function loggedIn(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorised user" });
  }
}

export default router;
