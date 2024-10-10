import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma/prismaClient";
import { User } from "@prisma/client";

import dotenv from 'dotenv';
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },

    async function (accessToken, refreshToken, profile, done) {
      if (!profile?._json?.email) return done(null, null);

      const email: string = profile?._json?.email;
      const firstName: string = profile.name.givenName;
      const lastName: string = profile.name.familyName;

      const user = await prisma.user.upsert({
        where: { email: email },
        create: { email: email },
        update: {
          customer: { upsert: { create: { firstName, lastName, address: "" }, update: {} } },
        },
      });
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id: User, done) => {
  done(null, id);
});
