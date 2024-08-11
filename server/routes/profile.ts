import express from "express";
import passport from "passport";
import prisma from "../prisma/prismaClient";
import { loggedIn } from "./auth";

const router = express.Router();

router.get("/user", loggedIn, async (req, res) => {
  const user = await prisma.user.findFirst({ where: { id: req.user.id }, include: { customer: true } });
  return res.json(user);
});

router.post("/user", loggedIn, async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) return res.status(400).json({ message: "Invalid body." });
  const updatedUser = await prisma.user.update({
    where: { email: req.user.email },
    data: { customer: { update: { firstName: firstName, lastName: lastName } } },
  });
  return res.json({});
});

export default router;
