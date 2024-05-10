const router = require("express").Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
