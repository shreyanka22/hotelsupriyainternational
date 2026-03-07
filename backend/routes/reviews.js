// import express from "express"
// import Review from "../models/Review.js"
// import { requireAdmin } from "../middleware/auth.js"
// const router = express.Router()

// /* ── PUBLIC — Get all featured/published reviews ── */
// router.get("/", async (req, res) => {
//   try {
//     const reviews = await Review.find({ featured: true }).sort({ createdAt: -1 })
//     res.json(reviews)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// /* ── ADMIN — Get ALL reviews ── */
// router.get("/all", requireAdmin, async (req, res) => {
//   try {
//     const reviews = await Review.find().sort({ createdAt: -1 })
//     res.json(reviews)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// /* ── ADMIN — Add review ── */
// router.post("/", requireAdmin, async (req, res) => {
//   try {
//     const review = await Review.create(req.body)
//     res.status(201).json(review)
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// })

// /* ── ADMIN — Edit review ── */
// router.put("/:id", requireAdmin, async (req, res) => {
//   try {
//     const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//     if (!review) return res.status(404).json({ error: "Review not found" })
//     res.json(review)
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// })

// /* ── ADMIN — Toggle featured ── */
// router.patch("/:id/featured", requireAdmin, async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.id)
//     if (!review) return res.status(404).json({ error: "Review not found" })
//     review.featured = !review.featured
//     await review.save()
//     res.json(review)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// /* ── ADMIN — Delete review ── */
// router.delete("/:id", requireAdmin, async (req, res) => {
//   try {
//     await Review.findByIdAndDelete(req.params.id)
//     res.json({ success: true })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// export default router

import express from "express"
import Review from "../models/Review.js"
import { requireAdmin } from "../middleware/auth.js"
const router = express.Router()

/* ────────────────────────────────────────────
   PUBLIC — Get featured reviews (shown on website)
──────────────────────────────────────────── */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ featured: true }).sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* ────────────────────────────────────────────
   PUBLIC — Guest submits a review from website
   Starts as featured: false (pending admin approval)
──────────────────────────────────────────── */
router.post("/submit", async (req, res) => {
  try {
    const { guestName, rating, comment, roomType } = req.body
    if (!guestName || !rating || !comment) {
      return res.status(400).json({ error: "Name, rating and comment are required" })
    }
    const review = await Review.create({
      guestName, rating, comment, roomType,
      featured: false,  // pending approval by admin
    })
    res.status(201).json({ success: true, message: "Thank you for your review! .", review })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/* ────────────────────────────────────────────
   ADMIN — Get ALL reviews (pending + featured)
──────────────────────────────────────────── */
router.get("/all", requireAdmin, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* ── ADMIN — Edit review ── */
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!review) return res.status(404).json({ error: "Review not found" })
    res.json(review)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/* ── ADMIN — Approve / toggle featured (this is how admin "approves" a review) ── */
router.patch("/:id/featured", requireAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) return res.status(404).json({ error: "Review not found" })
    review.featured = !review.featured
    await review.save()
    res.json(review)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* ── ADMIN — Delete review ── */
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router