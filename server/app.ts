import express, { Express } from "express";
const app: Express = express();
const port = 3000;
require("dotenv").config();

const passport = require("passport");
const passportSetup = require("./passport");
const session = require("express-session");
var authRouter = require("./routes/auth");

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

app.use(express.static("dist"));

app.use("/auth", authRouter);

app.get("/", (_, res) => {
  res.send("AutoDriveSell server is up and running!");
});

app.listen(port, () => {
  console.log(`AutoDriveSell server listening on port ${port}`);
});
