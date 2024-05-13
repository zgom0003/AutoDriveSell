import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma/prismaClient";
import { Admin } from "@prisma/client";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },

    async function (accessToken, refreshToken, profile, done) {
      if (!profile?._json?.email) return done(null, null);

      const foundAdmin = await prisma.admin.findFirst({ where: { email: profile?._json?.email } });
      return done(null, foundAdmin);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id: Admin, done) => {
  done(null, id);
});
