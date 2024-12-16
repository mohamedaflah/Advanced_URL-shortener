import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../models/user.model";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BASE_URL!}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log(existingUser);
        return done(null, existingUser as any);
      }
      const newUser = new User({
        googleId: profile.id,
        email: profile?.emails?.[0]?.value,
        username: profile.displayName,
        profileUrl: profile._json.picture,
      });
      await newUser.save();
      done(null, newUser as any);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as any);
});

export { passport };
