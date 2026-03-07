import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import dotenv from "dotenv"
dotenv.config()

/* ─────────────────────────────────────────────
   Only ONE email is allowed as admin.
   Set ADMIN_EMAIL in your .env file.
───────────────────────────────────────────── */
passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value
    if (email !== process.env.ADMIN_EMAIL) {
      return done(null, false, { message: "Unauthorized: not the admin email" })
    }
    // Build a lightweight admin user object (not stored in DB)
    const adminUser = {
      id:     profile.id,
      name:   profile.displayName,
      email,
      avatar: profile.photos?.[0]?.value,
    }
    return done(null, adminUser)
  } catch (err) {
    return done(err, null)
  }
}))

passport.serializeUser((user, done)   => done(null, user))
passport.deserializeUser((user, done) => done(null, user))