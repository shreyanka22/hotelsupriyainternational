// import dotenv from "dotenv"
// dotenv.config()
// console.log("Mongo URI from env:", process.env.MONGO_URI)
// import express from "express"
// import cors from "cors"
// // import dotenv from "dotenv"
// import session from "express-session"
// import MongoStore from "connect-mongo"
// import cookieParser from "cookie-parser"
// import passport from "passport"
// import connectDB from "./config/db.js"
// import "./config/passport.js"
// import authRoutes     from "./routes/auth.js"
// import enquiryRoutes  from "./routes/enquiries.js"
// import reviewRoutes   from "./routes/reviews.js"

// // dotenv.config()
// connectDB()

// const app = express()

// /* ── Middleware ── */
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true,
// }))
// app.use(express.json())
// app.use(cookieParser())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//   // cookie: {
//   //   secure: false,       // set true in production with HTTPS
//   //   httpOnly: true,
//   //   maxAge: 1000 * 60 * 60 * 24, // 1 day
//   // },
//   cookie: {
//   secure: true,
//   sameSite: "none",
//   httpOnly: true,
//   maxAge: 1000 * 60 * 60 * 24,
// }
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// /* ── Routes ── */
// app.use("/api/auth",      authRoutes)
// app.use("/api/enquiries", enquiryRoutes)
// app.use("/api/reviews",   reviewRoutes)

// /* ── Health check ── */
// app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Hotel Supriya API running" }))

// const PORT = process.env.PORT 
// app.listen(PORT, () => console.log(`🏨 Server running on http://localhost:${PORT}`))

import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import session from "express-session"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import passport from "passport"
import connectDB from "./config/db.js"
import "./config/passport.js"
import authRoutes    from "./routes/auth.js"
import enquiryRoutes from "./routes/enquiries.js"
import reviewRoutes  from "./routes/reviews.js"

dotenv.config()
connectDB()

const app = express()

/* ── CORS — allow localhost + Vercel ── */
const allowedOrigins = [
  "http://localhost:5173",
  "https://hotelsupriyainternational.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/* ── Session ── */
const mongoUrl = process.env.MONGODB_URI || process.env.MONGO_URI

app.use(session({
  secret: process.env.SESSION_SECRET || "supriya_secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl,
    touchAfter: 24 * 3600,
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24,
  },
}))

/* ── Passport ── */
app.use(passport.initialize())
app.use(passport.session())

/* ── Fix for Express v5 isAuthenticated ── */
app.use((req, res, next) => {
  req.isAuthenticated = req.isAuthenticated || (() => !!req.user)
  next()
})

/* ── Routes ── */
app.use("/api/auth",      authRoutes)
app.use("/api/enquiries", enquiryRoutes)
app.use("/api/reviews",   reviewRoutes)

/* ── Health check ── */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Hotel Supriya API running" })
})

/* ── Global error handler ── */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || "Internal server error" })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`🏨 Server running on http://localhost:${PORT}`)
})