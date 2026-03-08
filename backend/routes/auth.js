// // import express from "express"
// // import passport from "passport"
// // const router = express.Router()

// // /* ── Start Google login ── */
// // router.get("/google",
// //   passport.authenticate("google", { scope: ["profile", "email"] })
// // )

// // /* ── Google callback ── */
// // router.get("/google/callback",
// //   passport.authenticate("google", {
// //     failureRedirect: `${process.env.CLIENT_URL}/admin?error=unauthorized`,
// //   }),
// //   (req, res) => {
// //     // Success — redirect to admin dashboard
// //     res.redirect(`${process.env.CLIENT_URL}/admin`)
// //   }
// // )

// // /* ── Check session (called by frontend on load) ── */
// // router.get("/me", (req, res) => {
// //   if (req.isAuthenticated()) {
// //     res.json({ loggedIn: true, user: req.user })
// //   } else {
// //     res.json({ loggedIn: false })
// //   }
// // })

// // /* ── Logout ── */
// // router.post("/logout", (req, res, next) => {
// //   req.logout((err) => {
// //     if (err) return next(err)
// //     req.session.destroy()
// //     res.json({ success: true })
// //   })
// // })

// // export default router

// import express from "express"
// import passport from "passport"
// const router = express.Router()

// /* ── Start Google login ── */
// router.get("/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// )

// /* ── Google callback ── */
// router.get("/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${process.env.CLIENT_URL}/admin?error=unauthorized`,
//   }),
//   (req, res) => {
//     // Pass user info as URL params so frontend doesn't need cookies
//     const user = req.user
//     const params = new URLSearchParams({
//       loggedIn: "true",
//       name: user.name || "",
//       email: user.email || "",
//       avatar: user.avatar || "",
//     })
//     res.redirect(`${process.env.CLIENT_URL}/admin?${params.toString()}`)
//   }
// )

// /* ── Check session ── */
// router.get("/me", (req, res) => {
//   if (req.isAuthenticated && req.isAuthenticated()) {
//     return res.json({ loggedIn: true, user: req.user })
//   }
//   res.json({ loggedIn: false })
// })

// /* ── Logout ── */
// router.post("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) return next(err)
//     req.session.destroy()
//     res.json({ success: true })
//   })
// })

// export default router

import express from "express"
import passport from "passport"
const router = express.Router()

/* ── Start Google login ── */
router.get("/google",
  passport.authenticate("google", { 
    scope: ["profile", "email"],
    prompt: "select_account",
  })
)

/* ── Google callback ── */
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.error("OAuth error:", err)
      return res.redirect(`${process.env.CLIENT_URL}/admin?error=oauth_error`)
    }
    if (!user) {
      console.error("OAuth no user:", info)
      return res.redirect(`${process.env.CLIENT_URL}/admin?error=unauthorized`)
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error("Login error:", loginErr)
        return res.redirect(`${process.env.CLIENT_URL}/admin?error=login_error`)
      }
      // Pass user via URL params (bypasses cookie issues)
      const params = new URLSearchParams({
        loggedIn: "true",
        name:     user.name   || "",
        email:    user.email  || "",
        avatar:   user.avatar || "",
      })
      return res.redirect(`${process.env.CLIENT_URL}/admin?${params.toString()}`)
    })
  })(req, res, next)
})

/* ── Check session ── */
router.get("/me", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.json({ loggedIn: true, user: req.user })
  }
  res.json({ loggedIn: false })
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