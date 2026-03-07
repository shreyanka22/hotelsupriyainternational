import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function Stars({ rating, interactive = false, onSet }) {
  const [hovered, setHovered] = useState(0)
  return (
    <span className="flex gap-1">
      {[1,2,3,4,5].map((s) => (
        <span key={s}
          onClick={() => interactive && onSet(s)}
          onMouseEnter={() => interactive && setHovered(s)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{
            color: s <= (hovered || rating) ? "#C9A84C" : "rgba(201,168,76,0.2)",
            fontSize: interactive ? "28px" : "16px",
            cursor: interactive ? "pointer" : "default",
            transition: "color 0.15s",
          }}>★</span>
      ))}
    </span>
  )
}

export default function ReviewSection() {
  const [reviews,   setReviews]   = useState([])
  const [showForm,  setShowForm]  = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState("")
  const [form, setForm] = useState({ guestName: "", rating: 5, comment: "", roomType: "" })

  // Load approved reviews from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/reviews`)
      .then((r) => r.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]))
  }, [submitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!form.guestName.trim()) return setError("Please enter your name.")
    if (!form.comment.trim())   return setError("Please write a comment.")
    if (form.comment.trim().length < 20) return setError("Please write at least 20 characters.")

    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/reviews/submit`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed")
      setSubmitted(true)
      setShowForm(false)
      setForm({ guestName: "", rating: 5, comment: "", roomType: "" })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-32 px-8 md:px-20 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;700&family=Cormorant+Garamond:wght@300;400&display=swap');
        .review-input {
          width: 100%; padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 10px; color: white; outline: none;
          font-family: 'Cormorant Garamond', serif; font-size: 1rem;
          transition: border-color 0.3s;
        }
        .review-input:focus { border-color: rgba(201,168,76,0.55); }
        .review-input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.04), transparent)" }} />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div className="tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: "'Cinzel',serif", fontSize: "0.65rem", color: "rgba(201,168,76,0.55)" }}>
            Guest Experiences
          </div>
          <h2 className="font-thin text-white leading-none mb-6"
            style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,6vw,5rem)" }}>
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-yellow-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <div className="h-px w-16 bg-yellow-500/50" />
          </div>

          {/* Submit review button */}
          {!submitted ? (
            <button onClick={() => setShowForm((v) => !v)}
              className="px-8 py-3 rounded-sm transition-all duration-300"
              style={{
                background: showForm ? "linear-gradient(135deg,#C9A84C,#F0D080)" : "transparent",
                border: "1px solid rgba(201,168,76,0.4)",
                color: showForm ? "black" : "rgba(201,168,76,0.8)",
                fontFamily: "'Cinzel',serif", fontSize: "0.62rem", letterSpacing: "0.2em", fontWeight: 700,
              }}>
              {showForm ? "× Close Form" : "✦ Share Your Experience"}
            </button>
          ) : (
            <motion.div className="inline-flex items-center gap-3 px-8 py-3 rounded-sm"
              style={{ background: "rgba(104,211,145,0.1)", border: "1px solid rgba(104,211,145,0.3)", color: "#68D391" }}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <span>✓</span>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: "0.62rem", letterSpacing: "0.15em" }}>
                Review submitted — pending approval
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* ── REVIEW FORM ── */}
        <AnimatePresence>
          {showForm && (
            <motion.div className="max-w-2xl mx-auto mb-16 rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.18)" }}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 64 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}>
              <h3 className="text-white text-2xl font-thin mb-8"
                style={{ fontFamily: "'Playfair Display',serif" }}>Share Your Experience</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Room */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-yellow-500/50 uppercase tracking-widest"
                      style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem" }}>Your Name *</label>
                    <input className="review-input" placeholder="e.g. Priya Sharma, Mumbai"
                      value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-2 text-yellow-500/50 uppercase tracking-widest"
                      style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem" }}>Room Stayed In</label>
                    <select className="review-input" value={form.roomType}
                      onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                      style={{ background: "rgba(0,0,0,0.5)" }}>
                      <option value="">Select room...</option>
                      {["Deluxe AC","Deluxe Twin","Deluxe Non-AC","Executive AC","Non-AC","Suite"].map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block mb-3 text-yellow-500/50 uppercase tracking-widest"
                    style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem" }}>Your Rating *</label>
                  <Stars rating={form.rating} interactive onSet={(r) => setForm({ ...form, rating: r })} />
                  <div className="text-gray-600 text-xs mt-1">
                    {["","Poor","Fair","Good","Very Good","Excellent!"][form.rating]}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block mb-2 text-yellow-500/50 uppercase tracking-widest"
                    style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem" }}>Your Review *</label>
                  <textarea className="review-input" rows={4}
                    placeholder="Tell us about your stay — what did you love most?"
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    style={{ resize: "none" }} />
                  <div className="text-right text-gray-700 text-xs mt-1">{form.comment.length} chars</div>
                </div>

                {error && (
                  <div className="px-4 py-3 rounded-lg text-sm"
                    style={{ background: "rgba(252,129,129,0.08)", border: "1px solid rgba(252,129,129,0.25)", color: "#FC8181" }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-sm transition-all"
                  style={{
                    background: loading ? "rgba(201,168,76,0.4)" : "linear-gradient(135deg,#C9A84C,#F0D080)",
                    color: "black", fontFamily: "'Cinzel',serif", fontSize: "0.65rem",
                    letterSpacing: "0.2em", fontWeight: 700,
                  }}>
                  {loading ? "Submitting..." : "Submit Review"}
                </button>

                <p className="text-gray-700 text-xs text-center">
                  Reviews are shown after verification by our team.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── APPROVED REVIEWS DISPLAY ── */}
        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={r._id}
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg,rgba(201,168,76,0.05),rgba(0,0,0,0.4))", border: "1px solid rgba(201,168,76,0.14)" }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}>
                {/* Quote mark */}
                <div className="absolute top-4 right-6 text-yellow-500/10 select-none pointer-events-none"
                  style={{ fontFamily: "'Playfair Display',serif", fontSize: "80px", lineHeight: 1 }}>"</div>

                {/* Stars */}
                <Stars rating={r.rating} />

                {/* Comment */}
                <p className="text-gray-300 leading-relaxed my-5 relative z-10"
                  style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.1rem" }}>
                  "{r.comment}"
                </p>

                {/* Guest info */}
                <div className="flex items-center gap-3 border-t pt-5"
                  style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}>
                    {r.guestName?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{r.guestName}</div>
                    {r.roomType && (
                      <div className="text-yellow-500/40 text-xs tracking-wider uppercase mt-0.5"
                        style={{ fontFamily: "'Cinzel',serif", fontSize: "0.48rem" }}>{r.roomType}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-700 py-10">
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem" }}>
              Be the first to share your experience
            </p>
          </div>
        )}
      </div>
    </section>
  )
}