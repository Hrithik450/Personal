import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const googleAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userEmail = profile.emails[0].value;
          return done(null, { email: userEmail });
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};
