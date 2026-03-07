// import express from "express"
// import nodemailer from "nodemailer"
// import Enquiry from "../models/Enquiry.js"
// import { requireAdmin } from "../middleware/auth.js"
// const router = express.Router()

// /* ── Nodemailer transporter ── */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.ADMIN_EMAIL,
//     pass: process.env.EMAIL_APP_PASSWORD,   // Gmail App Password (not your Gmail login)
//   },
// })

// /* ─────────────────────────────────────────────
//    PUBLIC — Submit new enquiry (from website form)
// ───────────────────────────────────────────── */
// router.post("/", async (req, res) => {
//   try {
//     const enquiry = await Enquiry.create(req.body)

//     // Email notification to admin
//     try {
//       await transporter.sendMail({
//         from: `"Hotel Supriya Website" <${process.env.ADMIN_EMAIL}>`,
//         to:   process.env.ADMIN_EMAIL,
//         subject: `🏨 New Enquiry from ${enquiry.name}`,
//         html: `
//           <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;border:1px solid #C9A84C33">
//             <h2 style="color:#C9A84C;margin-bottom:4px">New Enquiry Received</h2>
//             <p style="color:#999;margin-top:0">Hotel Supriya International</p>
//             <hr style="border-color:#C9A84C33;margin:24px 0"/>
//             <table style="width:100%;border-collapse:collapse">
//               <tr><td style="padding:8px 0;color:#999;width:140px">Name</td><td style="color:#fff;font-weight:bold">${enquiry.name}</td></tr>
//               <tr><td style="padding:8px 0;color:#999">Email</td><td style="color:#fff">${enquiry.email}</td></tr>
//               <tr><td style="padding:8px 0;color:#999">Phone</td><td style="color:#fff">${enquiry.phone}</td></tr>
//               <tr><td style="padding:8px 0;color:#999">Room Type</td><td style="color:#C9A84C">${enquiry.roomType}</td></tr>
//               <tr><td style="padding:8px 0;color:#999">Check-in</td><td style="color:#fff">${new Date(enquiry.checkIn).toDateString()}</td></tr>
//               <tr><td style="padding:8px 0;color:#999">Check-out</td><td style="color:#fff">${new Date(enquiry.checkOut).toDateString()}</td></tr>
//               <tr><td style="padding:8px 0;color:#999">Guests</td><td style="color:#fff">${enquiry.guests}</td></tr>
//               ${enquiry.message ? `<tr><td style="padding:8px 0;color:#999;vertical-align:top">Message</td><td style="color:#fff">${enquiry.message}</td></tr>` : ""}
//             </table>
//             <hr style="border-color:#C9A84C33;margin:24px 0"/>
//             <p style="color:#666;font-size:12px">Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
//           </div>
//         `,
//       })
//     } catch (emailErr) {
//       console.warn("Email send failed (non-fatal):", emailErr.message)
//     }

//     res.status(201).json({ success: true, enquiry })
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// })

// /* ─────────────────────────────────────────────
//    ADMIN — Get all enquiries with filters
// ───────────────────────────────────────────── */
// router.get("/", requireAdmin, async (req, res) => {
//   try {
//     const { status, page = 1, limit = 20 } = req.query
//     const filter = status ? { status } : {}
//     const total  = await Enquiry.countDocuments(filter)
//     const items  = await Enquiry.find(filter)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(Number(limit))
//     res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// /* ── ADMIN — Stats for dashboard charts ── */
// router.get("/stats", requireAdmin, async (req, res) => {
//   try {
//     const total     = await Enquiry.countDocuments()
//     const newCount  = await Enquiry.countDocuments({ status: "new" })
//     const contacted = await Enquiry.countDocuments({ status: "contacted" })
//     const resolved  = await Enquiry.countDocuments({ status: "resolved" })

//     // Last 7 days daily counts
//     const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
//     const daily = await Enquiry.aggregate([
//       { $match: { createdAt: { $gte: sevenDaysAgo } } },
//       { $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//           count: { $sum: 1 },
//       }},
//       { $sort: { _id: 1 } },
//     ])

//     // Room type breakdown
//     const byRoom = await Enquiry.aggregate([
//       { $group: { _id: "$roomType", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ])

//     res.json({ total, newCount, contacted, resolved, daily, byRoom })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// /* ── ADMIN — Update enquiry status ── */
// router.patch("/:id/status", requireAdmin, async (req, res) => {
//   try {
//     const { status } = req.body
//     const enquiry = await Enquiry.findByIdAndUpdate(
//       req.params.id, { status }, { new: true }
//     )
//     if (!enquiry) return res.status(404).json({ error: "Enquiry not found" })
//     res.json(enquiry)
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// })

// /* ── ADMIN — Delete enquiry ── */
// router.delete("/:id", requireAdmin, async (req, res) => {
//   try {
//     await Enquiry.findByIdAndDelete(req.params.id)
//     res.json({ success: true })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// export default router

import express from "express"
import nodemailer from "nodemailer"
import Enquiry from "../models/Enquiry.js"
import { requireAdmin } from "../middleware/auth.js"
const router = express.Router()

/* ── Email transporter ── */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD?.replace(/\s/g, ""), // strips spaces from app password
  },
})

/* ─────────────────────────────────────────
   PUBLIC — Submit enquiry + send email
───────────────────────────────────────── */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, roomType, checkIn, checkOut, guests, message } = req.body

    // Basic validation
    if (!name || !email || !phone || !roomType || !checkIn || !checkOut) {
      return res.status(400).json({ error: "Please fill in all required fields." })
    }

    const enquiry = await Enquiry.create({ name, email, phone, roomType, checkIn, checkOut, guests, message })

    // Send email notification (non-blocking)
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    transporter.sendMail({
      from: `"Hotel Supriya Website" <${process.env.ADMIN_EMAIL}>`,
      to:   process.env.ADMIN_EMAIL,
      subject: `🏨 New Enquiry from ${name} — ${roomType}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0a0a0a;color:#fff;padding:36px;border-radius:16px;border:1px solid #C9A84C44">
          <div style="text-align:center;margin-bottom:28px">
            <h1 style="color:#C9A84C;font-size:24px;margin:0;font-weight:400;letter-spacing:4px">HOTEL SUPRIYA</h1>
            <p style="color:#666;font-size:12px;letter-spacing:2px;margin:4px 0 0">NEW ENQUIRY RECEIVED</p>
          </div>
          <hr style="border:none;border-top:1px solid #C9A84C33;margin:0 0 28px"/>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;color:#999;width:120px;font-size:13px">Name</td><td style="color:#fff;font-weight:bold;font-size:15px">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#999;font-size:13px">Email</td><td style="color:#C9A84C;font-size:14px">${email}</td></tr>
            <tr><td style="padding:10px 0;color:#999;font-size:13px">Phone</td><td style="color:#fff;font-size:14px">${phone}</td></tr>
            <tr><td style="padding:10px 0;color:#999;font-size:13px">Room Type</td><td style="color:#C9A84C;font-weight:bold;font-size:14px">${roomType}</td></tr>
            <tr><td style="padding:10px 0;color:#999;font-size:13px">Check-in</td><td style="color:#fff;font-size:14px">${new Date(checkIn).toDateString()}</td></tr>
            <tr><td style="padding:10px 0;color:#999;font-size:13px">Check-out</td><td style="color:#fff;font-size:14px">${new Date(checkOut).toDateString()}</td></tr>
            <tr><td style="padding:10px 0;color:#999;font-size:13px">Duration</td><td style="color:#fff;font-size:14px">${nights} night${nights!==1?"s":""}</td></tr>
            <tr><td style="padding:10px 0;color:#999;font-size:13px">Guests</td><td style="color:#fff;font-size:14px">${guests}</td></tr>
            ${message ? `<tr><td style="padding:10px 0;color:#999;font-size:13px;vertical-align:top">Message</td><td style="color:#ddd;font-size:14px;line-height:1.6">${message}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #C9A84C33;margin:28px 0"/>
          <div style="text-align:center">
            <p style="color:#555;font-size:12px;margin:0">Submitted ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
            <p style="color:#333;font-size:11px;margin:4px 0 0">Hotel Supriya International, Sirsi, Karnataka</p>
          </div>
        </div>
      `,
    }).then(() => {
      console.log(`📧 Email sent for enquiry from ${name}`)
    }).catch((err) => {
      console.warn("⚠️  Email failed (enquiry still saved):", err.message)
    })

    res.status(201).json({ success: true, enquiry })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/* ─────────────────────────────────────────
   ADMIN — Get all enquiries with filters
───────────────────────────────────────── */
router.get("/", requireAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query
    const filter = status ? { status } : {}
    const total  = await Enquiry.countDocuments(filter)
    const items  = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* ── ADMIN — Stats for charts ── */
router.get("/stats", requireAdmin, async (req, res) => {
  try {
    const total     = await Enquiry.countDocuments()
    const newCount  = await Enquiry.countDocuments({ status: "new" })
    const contacted = await Enquiry.countDocuments({ status: "contacted" })
    const resolved  = await Enquiry.countDocuments({ status: "resolved" })

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    const daily = await Enquiry.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])

    const byRoom = await Enquiry.aggregate([
      { $group: { _id: "$roomType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    res.json({ total, newCount, contacted, resolved, daily, byRoom })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* ── ADMIN — Update status ── */
router.patch("/:id/status", requireAdmin, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    )
    if (!enquiry) return res.status(404).json({ error: "Enquiry not found" })
    res.json(enquiry)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/* ── ADMIN — Delete ── */
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router