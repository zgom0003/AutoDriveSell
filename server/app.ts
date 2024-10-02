import express from "express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./prisma/prismaClient";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./passport";
import session from "express-session";

import authRouter, { loggedIn } from "./routes/auth";
import profileRouter from "./routes/profile";
import productRouter from "./routes/catalog";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
import cors from "cors";

// use it before all route definitions
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(
  session({
    key: "session",
    secret: process.env.SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/api/products", productRouter);

app.use("/auth", authRouter);

app.use("/profile", profileRouter);

app.get("/protected", loggedIn, (req, res, next) => {
  res.json({ data: "protected data" });
});

app.listen(PORT, () => {
  console.log(
    `AutoDriveSell server listening on port ${PORT}\nhttp://localhost:${PORT}`
  );
});
