import express from "express";
import passport from "passport";
import prisma from "../prisma/prismaClient";
import { loggedIn } from "./auth";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK!);

const router = express.Router();

router.post("/create-intent", async (req, res) => {
  console.log(req.body, "checkoutitems");
  const { checkoutItems }: { checkoutItems: { id: number }[] } = req.body;

  const awaitItems = checkoutItems.map(async (item) => {
    return await prisma.product.findFirst({ where: { id: item.id }, include: { productOptions: true } });
  });

  const items = await Promise.all(awaitItems);
  const prices = items.map((item) => item?.productOptions?.[0]?.price);
  if (prices.filter((price) => price === undefined).length > 0)
    return res.status(400).json({ message: "Invalid cart item." });

  const amount = prices.reduce((acc: number, price) => acc + price!, 0);

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "aud",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ client_secret: intent.client_secret });
  
  } catch (error) {
    console.log(error)
    res.json({ message: `Error creating stripe payment`})
  }

});

export default router;
