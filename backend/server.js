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

/* ── Trust proxy (required on Render) ── */
app.set("trust proxy", 1)

/* ── CORS — allow localhost + all Vercel deployments ── */
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile, curl, Render internal)
    if (!origin) return callback(null, true)
    // Allow localhost dev
    if (origin.startsWith("http://localhost")) return callback(null, true)
    // Allow ALL vercel.app domains (covers preview + production deployments)
    if (origin.endsWith(".vercel.app")) return callback(null, true)
    // Allow custom domain if set
    if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) return callback(null, true)
    console.warn("CORS blocked:", origin)
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
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl,
    touchAfter: 24 * 3600,
  }),
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24,
  },
}))

/* ── Passport ── */
app.use(passport.initialize())
app.use(passport.session())

/* ── Fix for Express v5 ── */
app.use((req, res, next) => {
  if (!req.isAuthenticated) req.isAuthenticated = () => !!req.user
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

/* ── Error handler ── */
app.use((err, req, res, next) => {
  console.error("Server error:", err.message)
  res.status(500).json({ error: err.message || "Internal server error" })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`🏨 Server running on http://localhost:${PORT}`)
})