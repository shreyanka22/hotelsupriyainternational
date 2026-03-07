import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { X } from "lucide-react"

const rooms = [
  { name: "Deluxe AC",     img: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg"    },
  { name: "Executive AC",  img: "https://hotelsupriyainternational.com/images/room/executiveroom.jpg" },
  { name: "Suite",         img: "https://hotelsupriyainternational.com/images/room/suiteroom.jpg"     },
  { name: "Deluxe Twin",   img: "https://hotelsupriyainternational.com/images/room/deluxetwin.jpg"    },
  { name: "Deluxe Non-AC", img: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg"    },
  { name: "Non-AC",        img: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg"    },
]

export default function EnquiryDialog({ open, setOpen }) {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0])
  const [name,         setName]         = useState("")
  const [phone,        setPhone]        = useState("")
  const [email,        setEmail]        = useState("")
  const [startDate,    setStartDate]    = useState(null)
  const [endDate,      setEndDate]      = useState(null)
  const [guests,       setGuests]       = useState(1)
  const [message,      setMessage]      = useState("")
  const [loading,      setLoading]      = useState(false)
  const [submitted,    setSubmitted]    = useState(false)
  const [error,        setError]        = useState("")

  const handleDateChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const reset = () => {
    setName(""); setPhone(""); setEmail(""); setMessage("")
    setStartDate(null); setEndDate(null); setGuests(1)
    setSelectedRoom(rooms[0]); setSubmitted(false); setError("")
  }

  const handleClose = () => { setOpen(false); setTimeout(reset, 400) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!name.trim())  return setError("Please enter your name.")
    if (!phone.trim()) return setError("Please enter your phone number.")
    if (!email.trim()) return setError("Please enter your email.")
    if (!startDate)    return setError("Please select check-in and check-out dates.")
    if (!endDate)      return setError("Please select a check-out date.")

    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/enquiries`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     name.trim(),
          phone:    phone.trim(),
          email:    email.trim().toLowerCase(),
          roomType: selectedRoom.name,
          checkIn:  startDate,
          checkOut: endDate,
          guests,
          message:  message.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed")
      setSubmitted(true)
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          style={{ background: "rgba(0,0,0,0.90)", backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&family=Cinzel:wght@400;700&family=Cormorant+Garamond:wght@300;400&display=swap');
            .enq-input {
              width: 100%; margin-top: 0.4rem; padding: 0.75rem 1rem;
              background: rgba(0,0,0,0.6); border: 1px solid rgba(201,168,76,0.2);
              border-radius: 0.5rem; color: white;
              font-family: 'Cormorant Garamond', serif; font-size: 1rem;
              transition: border-color 0.3s; outline: none;
            }
            .enq-input:focus { border-color: rgba(201,168,76,0.6); }
            .enq-input::placeholder { color: rgba(255,255,255,0.25); }
            .enq-label {
              font-family: 'Cinzel', serif; font-size: 0.55rem;
              letter-spacing: 0.25em; text-transform: uppercase;
              color: rgba(201,168,76,0.6);
            }
            .react-datepicker { background:#0a0a0a !important; border:1px solid rgba(201,168,76,0.3) !important; font-family:'Cormorant Garamond',serif !important; }
            .react-datepicker__header { background:#0a0a0a !important; border-bottom:1px solid rgba(201,168,76,0.2) !important; }
            .react-datepicker__current-month,.react-datepicker__day-name { color:#C9A84C !important; }
            .react-datepicker__day { color:rgba(255,255,255,0.7) !important; }
            .react-datepicker__day:hover { background:rgba(201,168,76,0.2) !important; }
            .react-datepicker__day--selected,.react-datepicker__day--in-range { background:rgba(201,168,76,0.3) !important; color:#fff !important; }
            .react-datepicker__day--keyboard-selected { background:rgba(201,168,76,0.4) !important; }
            .react-datepicker__navigation-icon::before { border-color:#C9A84C !important; }
          `}</style>

          <motion.div
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg,#0a0a0a,#111)", border: "1px solid rgba(201,168,76,0.2)", maxHeight: "92vh", overflowY: "auto" }}
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold top border */}
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />

            {/* Close button */}
            <button onClick={handleClose}
              className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
              <X size={16} />
            </button>

            {/* ── SUCCESS STATE ── */}
            {submitted ? (
              <motion.div className="flex flex-col items-center justify-center text-center p-16"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <motion.div className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
                  style={{ background: "rgba(104,211,145,0.1)", border: "1px solid rgba(104,211,145,0.3)" }}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}>
                  <span style={{ fontSize: "2rem" }}>✓</span>
                </motion.div>
                <h3 className="text-white text-3xl font-thin mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
                  Enquiry Received!
                </h3>
                <p className="text-gray-400 leading-relaxed mb-2" style={{ fontSize: "1.1rem" }}>
                  Thank you, <span style={{ color: "#C9A84C" }}>{name}</span>. Your enquiry has been submitted successfully.
                </p>
                <p className="text-gray-600 mb-10" style={{ fontSize: "0.9rem" }}>
                  Our team will contact you at <span className="text-gray-400">{email}</span> shortly.
                </p>
                <button onClick={handleClose}
                  className="px-10 py-3 rounded-sm"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#F0D080)", color: "black", fontFamily: "'Cinzel',serif", fontSize: "0.65rem", letterSpacing: "0.2em", fontWeight: 700 }}>
                  Close
                </button>
              </motion.div>
            ) : (
              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="text-yellow-500/50 tracking-[0.5em] uppercase mb-3" style={{ fontFamily: "'Cinzel',serif", fontSize: "0.6rem" }}>
                    Hotel Supriya International
                  </div>
                  <h2 className="text-white text-3xl font-thin" style={{ fontFamily: "'Playfair Display',serif" }}>
                    Reserve Your Stay
                  </h2>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Room selector */}
                  <div className="mb-6">
                    <label className="enq-label">Select Room</label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {rooms.map((r) => (
                        <button key={r.name} type="button"
                          onClick={() => setSelectedRoom(r)}
                          className="relative overflow-hidden rounded-lg transition-all"
                          style={{
                            border: selectedRoom.name === r.name
                              ? "1px solid rgba(201,168,76,0.7)"
                              : "1px solid rgba(201,168,76,0.15)",
                            padding: "8px 6px",
                            background: selectedRoom.name === r.name
                              ? "rgba(201,168,76,0.1)"
                              : "rgba(0,0,0,0.4)",
                          }}>
                          <div className="text-white text-center" style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem", letterSpacing: "0.1em" }}>
                            {r.name}
                          </div>
                          {selectedRoom.name === r.name && (
                            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="enq-label">Full Name</label>
                      <input className="enq-input" placeholder="Your name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                      <label className="enq-label">Phone</label>
                      <input className="enq-input" placeholder="+91 XXXXX XXXXX" type="tel"
                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="enq-label">Email Address</label>
                    <input className="enq-input" placeholder="your@email.com" type="email"
                      value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  {/* Date picker + Guests */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="enq-label">Check-in → Check-out</label>
                      <DatePicker
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        placeholderText="Select dates"
                        className="enq-input"
                        dateFormat="dd MMM yyyy"
                      />
                    </div>
                    <div>
                      <label className="enq-label">Guests</label>
                      <div className="flex items-center gap-3 mt-2">
                        <button type="button"
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all text-lg"
                          style={{ border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", background: "rgba(201,168,76,0.06)" }}>
                          −
                        </button>
                        <span className="text-white text-xl w-6 text-center"
                          style={{ fontFamily: "'Playfair Display',serif" }}>{guests}</span>
                        <button type="button"
                          onClick={() => setGuests((g) => Math.min(10, g + 1))}
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all text-lg"
                          style={{ border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", background: "rgba(201,168,76,0.06)" }}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="enq-label">Special Requests (optional)</label>
                    <textarea className="enq-input" rows={3} placeholder="Early check-in, dietary needs, occasion..."
                      value={message} onChange={(e) => setMessage(e.target.value)}
                      style={{ resize: "none" }} />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mb-4 px-4 py-3 rounded-lg text-sm"
                      style={{ background: "rgba(252,129,129,0.1)", border: "1px solid rgba(252,129,129,0.3)", color: "#FC8181" }}>
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    className="w-full py-4 rounded-sm transition-all relative overflow-hidden"
                    style={{
                      background: loading ? "rgba(201,168,76,0.4)" : "linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C)",
                      color: "black", fontFamily: "'Cinzel',serif", fontSize: "0.68rem",
                      letterSpacing: "0.2em", fontWeight: 700,
                    }}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <motion.span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black inline-block"
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                        Submitting...
                      </span>
                    ) : "Submit Enquiry"}
                  </button>
                </form>
              </div>
            )}
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}