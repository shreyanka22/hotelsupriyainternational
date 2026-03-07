import express from "express"
import passport from "passport"
const router = express.Router()

/* ── Start Google login ── */
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

/* ── Google callback ── */
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/admin?error=unauthorized`,
  }),
  (req, res) => {
    // Success — redirect to admin dashboard
    res.redirect(`${process.env.CLIENT_URL}/admin`)
  }
)

/* ── Check session (called by frontend on load) ── */
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user })
  } else {
    res.json({ loggedIn: false })
  }
})

/* ── Logout ── */
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    req.session.destroy()
    res.json({ success: true })
  })
})

export default router