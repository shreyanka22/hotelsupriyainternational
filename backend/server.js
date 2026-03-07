import dotenv from "dotenv"
dotenv.config()
console.log("Mongo URI from env:", process.env.MONGO_URI)
import express from "express"
import cors from "cors"
// import dotenv from "dotenv"
import session from "express-session"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import passport from "passport"
import connectDB from "./config/db.js"
import "./config/passport.js"
import authRoutes     from "./routes/auth.js"
import enquiryRoutes  from "./routes/enquiries.js"
import reviewRoutes   from "./routes/reviews.js"

// dotenv.config()
connectDB()

const app = express()

/* ── Middleware ── */
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    secure: false,       // set true in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}))
app.use(passport.initialize())
app.use(passport.session())

/* ── Routes ── */
app.use("/api/auth",      authRoutes)
app.use("/api/enquiries", enquiryRoutes)
app.use("/api/reviews",   reviewRoutes)

/* ── Health check ── */
app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Hotel Supriya API running" }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🏨 Server running on http://localhost:${PORT}`))

