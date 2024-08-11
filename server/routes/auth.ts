import express from "express";
import passport from "passport";
import prisma from "../prisma/prismaClient";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login-failure` }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL!);
  }
);

router.get("/status", (req, res) => {
  return res.json({ loggedIn: req.user !== undefined });
});


router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export function loggedIn(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorised user" });
  }
}

export default router;
