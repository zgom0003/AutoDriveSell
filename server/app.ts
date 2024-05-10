import express, { Express } from "express";
const app: Express = express();
const port = 3000;
require("dotenv").config();

const passport = require("passport");
const passportSetup = require("./passport");
const session = require("express-session");
var authRouter = require("./routes/auth");

const cookieSession = require("cookie-session");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authUser = (user, password, done) => {
  console.log(`Value of "User" in authUser function ----> ${user}`); //passport will populate, user = req.body.username
  console.log(`Value of "Password" in authUser function ----> ${password}`); //passport will popuplate, password = req.body.password

  // Use the "user" and "password" to search the DB and match user/password to authenticate the user
  // 1. If the user not found, done (null, false)
  // 2. If the password does not match, done (null, false)
  // 3. If user found and password match, done (null, user)

  let authenticated_user = { id: 123, name: "Kyle" };
  //Let's assume that DB search that user found and password matched for Kyle

  return done(null, false);
  return done(null, authenticated_user);
};

app.use(express.static("dist"));

app.use("/auth", authRouter);

app.get("/", (_, res) => {
  res.send("AutoDriveSell server is up and running!");
});

app.listen(port, () => {
  console.log(`AutoDriveSell server listening on port ${port}`);
});
