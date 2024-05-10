const router = require("express").Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login-failure` }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);

module.exports = router;
