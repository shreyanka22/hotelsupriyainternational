// import { useState } from "react"
// import { motion } from "framer-motion"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import { toast } from "sonner"
// import { X } from "lucide-react"

// export default function EnquiryDialog({ open, setOpen }) {

//   const rooms = [
//     {
//       name: "Deluxe AC",
//       img: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg"
//     },
//     {
//       name: "Executive AC",
//       img: "https://hotelsupriyainternational.com/images/room/executiveroom.jpg"
//     },
//     {
//       name: "Suite",
//       img: "https://hotelsupriyainternational.com/images/room/suiteroom.jpg"
//     }
//   ]

//   const [selectedRoom, setSelectedRoom] = useState(rooms[0])

//   const [name, setName] = useState("")
//   const [phone, setPhone] = useState("")
//   const [email, setEmail] = useState("")

//   const [startDate, setStartDate] = useState(null)
//   const [endDate, setEndDate] = useState(null)

//   const [guests, setGuests] = useState(1)

//   const handleDateChange = (dates) => {
//     const [start, end] = dates
//     setStartDate(start)
//     setEndDate(end)

//     if (start && end) {
//       setTimeout(() => {
//         document.activeElement.blur()
//       }, 200)
//     }
//   }

//   const handleSubmit = (e) => {

//     e.preventDefault()

//     const enquiry = {
//       name,
//       phone,
//       email,
//       room: selectedRoom.name,
//       guests,
//       checkIn: startDate,
//       checkOut: endDate
//     }

//     console.log(enquiry)

//     toast.success("Enquiry submitted successfully!")

//     setOpen(false)
//   }

//   if (!open) return null

//   return (

//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">

//       <motion.div
//   initial={{ scale: 0.9, opacity: 0 }}
//   animate={{ scale: 1, opacity: 1 }}
//   className="glass p-10 rounded-2xl w-full max-w-3xl relative"
// >

//         <h2 className="text-3xl text-gold mb-8 text-center">
//           Book Your Stay
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-8">

//           {/* Name + Phone */}

//           <div className="grid md:grid-cols-2 gap-6">

//             <div>
//               <label className="text-sm text-gray-400">
//                 Name
//               </label>

//               <input
//                 value={name}
//                 onChange={(e)=>setName(e.target.value)}
//                 className="w-full mt-2 px-4 py-3 bg-black border border-gray-700 rounded-lg"
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-400">
//                 Phone
//               </label>

//               <input
//                 value={phone}
//                 onChange={(e)=>setPhone(e.target.value)}
//                 className="w-full mt-2 px-4 py-3 bg-black border border-gray-700 rounded-lg"
//               />
//             </div>

//           </div>


//           {/* Email */}

//           <div>

//             <label className="text-sm text-gray-400">
//               Email
//             </label>

//             <input
//               value={email}
//               onChange={(e)=>setEmail(e.target.value)}
//               className="w-full mt-2 px-4 py-3 bg-black border border-gray-700 rounded-lg"
//             />

//           </div>


//           {/* Calendar */}

//           <div>

//             <label className="text-sm text-gray-400">
//               Stay Dates
//             </label>

//             <DatePicker
//               selectsRange
//               startDate={startDate}
//               endDate={endDate}
//               onChange={handleDateChange}
//               monthsShown={2}
//               minDate={new Date()}
//               placeholderText="Select check-in and check-out"
//               className="w-full mt-2 px-4 py-3 bg-black border border-gray-700 rounded-lg"
//             />

//           </div>


//           {/* Room Selector */}

//           <div>

//             <label className="text-sm text-gray-400 mb-3 block">
//               Select Room
//             </label>

//             <div className="grid md:grid-cols-3 gap-4">

//               {rooms.map((room) => (

//                 <div
//                   key={room.name}
//                   onClick={()=>setSelectedRoom(room)}
//                   className={`cursor-pointer border rounded-xl overflow-hidden transition 
//                   ${selectedRoom.name === room.name
//                     ? "border-yellow-500"
//                     : "border-gray-700"
//                   }`}
//                 >

//                   <img
//                     src={room.img}
//                     className="h-28 w-full object-cover"
//                   />

//                   <div className="p-3 text-center text-sm">
//                     {room.name}
//                   </div>

//                 </div>

//               ))}

//             </div>

//           </div>


//           {/* Guest Counter */}

//           <div>

//             <label className="text-sm text-gray-400">
//               Guests
//             </label>

//             <div className="flex items-center gap-4 mt-3">

//               {/* <button
//                 type="button"
//                 onClick={()=>setGuests(Math.max(1, guests-1))}
//                 className="w-10 h-10 bg-gray-800 rounded"
//               >
//                 −
//               </button> */}
//               <button
//   onClick={() => setOpen(false)}
//   className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
// >
//   <X size={22} />
// </button>

//               <span className="text-lg">
//                 {guests}
//               </span>

//               <button
//                 type="button"
//                 onClick={()=>setGuests(guests+1)}
//                 className="w-10 h-10 bg-gray-800 rounded"
//               >
//                 +
//               </button>

//             </div>

//           </div>


//           {/* Submit */}

//           <button
//             className="w-full py-3 gold-gradient text-black font-semibold rounded-lg hover:scale-[1.02] transition"
//           >
//             Submit Enquiry
//           </button>

//         </form>

//       </motion.div>

//     </div>
//   )
// }

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import { toast } from "sonner"
// import { X } from "lucide-react"

// const rooms = [
//   { name: "Deluxe AC",    img: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg"    },
//   { name: "Executive AC", img: "https://hotelsupriyainternational.com/images/room/executiveroom.jpg" },
//   { name: "Suite",        img: "https://hotelsupriyainternational.com/images/room/suiteroom.jpg"     },
// ]

// export default function EnquiryDialog({ open, setOpen }) {
//   const [selectedRoom, setSelectedRoom] = useState(rooms[0])
//   const [name,         setName]         = useState("")
//   const [phone,        setPhone]        = useState("")
//   const [email,        setEmail]        = useState("")
//   const [startDate,    setStartDate]    = useState(null)
//   const [endDate,      setEndDate]      = useState(null)
//   const [guests,       setGuests]       = useState(1)

//   const handleDateChange = (dates) => {
//     const [start, end] = dates
//     setStartDate(start)
//     setEndDate(end)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const enquiry = { name, phone, email, room: selectedRoom.name, guests, checkIn: startDate, checkOut: endDate }
//     console.log(enquiry)
//     toast.success("Enquiry submitted! We'll contact you shortly.")
//     setOpen(false)
//     // reset
//     setName(""); setPhone(""); setEmail("")
//     setStartDate(null); setEndDate(null); setGuests(1)
//   }

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
//           style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setOpen(false)}
//         >
//           <style>{`
//             @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&family=Cinzel:wght@400;700&display=swap');
//             .enq-input {
//               width: 100%;
//               margin-top: 0.5rem;
//               padding: 0.75rem 1rem;
//               background: rgba(0,0,0,0.6);
//               border: 1px solid rgba(201,168,76,0.2);
//               border-radius: 0.5rem;
//               color: white;
//               font-family: 'Cormorant Garamond', serif;
//               font-size: 1rem;
//               transition: border-color 0.3s;
//               outline: none;
//             }
//             .enq-input:focus { border-color: rgba(201,168,76,0.6); }
//             .enq-input::placeholder { color: rgba(255,255,255,0.25); }
//             .enq-label {
//               font-family: 'Cinzel', serif;
//               font-size: 0.55rem;
//               letter-spacing: 0.25em;
//               text-transform: uppercase;
//               color: rgba(201,168,76,0.6);
//             }
//             /* Style the datepicker to match */
//             .react-datepicker {
//               background: #0a0a0a !important;
//               border: 1px solid rgba(201,168,76,0.3) !important;
//               font-family: 'Cormorant Garamond', serif !important;
//               color: white !important;
//             }
//             .react-datepicker__header {
//               background: #111 !important;
//               border-bottom: 1px solid rgba(201,168,76,0.2) !important;
//             }
//             .react-datepicker__current-month,
//             .react-datepicker__day-name { color: #C9A84C !important; }
//             .react-datepicker__day { color: white !important; }
//             .react-datepicker__day:hover { background: rgba(201,168,76,0.2) !important; border-radius: 4px; }
//             .react-datepicker__day--selected,
//             .react-datepicker__day--in-range,
//             .react-datepicker__day--range-start,
//             .react-datepicker__day--range-end {
//               background: rgba(201,168,76,0.4) !important;
//               border-radius: 4px !important;
//             }
//             .react-datepicker__day--range-start,
//             .react-datepicker__day--range-end {
//               background: #C9A84C !important;
//               color: black !important;
//             }
//             .react-datepicker__day--disabled { color: rgba(255,255,255,0.2) !important; }
//             .react-datepicker__navigation-icon::before { border-color: #C9A84C !important; }
//           `}</style>

//           <motion.div
//             className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
//             style={{
//               background: "linear-gradient(135deg, rgba(201,168,76,0.06), rgba(0,0,0,0.95))",
//               border: "1px solid rgba(201,168,76,0.2)",
//               backdropFilter: "blur(20px)",
//             }}
//             initial={{ scale: 0.88, y: 40, opacity: 0 }}
//             animate={{ scale: 1, y: 0, opacity: 1 }}
//             exit={{ scale: 0.88, y: 40, opacity: 0 }}
//             transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className="px-10 pt-10 pb-6 border-b border-yellow-500/10 flex items-start justify-between">
//               <div>
//                 <div className="enq-label mb-2">Hotel Supriya International</div>
//                 <h2
//                   className="text-4xl font-thin"
//                   style={{
//                     fontFamily: "'Playfair Display', serif",
//                     background: "linear-gradient(135deg, #C9A84C, #F0D080, #C9A84C)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                   }}
//                 >
//                   Book Your Stay
//                 </h2>
//               </div>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="mt-1 p-2 rounded-full border border-yellow-500/20 text-gray-400
//                   hover:text-yellow-400 hover:border-yellow-500/50 transition-all"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="px-10 py-8 space-y-7">

//               {/* Name + Phone */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="enq-label">Full Name</label>
//                   <input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Your name"
//                     className="enq-input"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="enq-label">Phone Number</label>
//                   <input
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     placeholder="+91 XXXXX XXXXX"
//                     className="enq-input"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="enq-label">Email Address</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your@email.com"
//                   className="enq-input"
//                   required
//                 />
//               </div>

//               {/* Calendar */}
//               <div>
//                 <label className="enq-label">Stay Dates</label>
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={handleDateChange}
//                   monthsShown={2}
//                   minDate={new Date()}
//                   placeholderText="Select check-in → check-out"
//                   className="enq-input"
//                 />
//               </div>

//               {/* Room Selector */}
//               <div>
//                 <label className="enq-label block mb-3">Select Room Type</label>
//                 <div className="grid grid-cols-3 gap-4">
//                   {rooms.map((room) => (
//                     <div
//                       key={room.name}
//                       onClick={() => setSelectedRoom(room)}
//                       className="cursor-pointer rounded-2xl overflow-hidden transition-all duration-300"
//                       style={{
//                         border: selectedRoom.name === room.name
//                           ? "1px solid rgba(201,168,76,0.7)"
//                           : "1px solid rgba(255,255,255,0.08)",
//                         boxShadow: selectedRoom.name === room.name
//                           ? "0 0 20px rgba(201,168,76,0.15)"
//                           : "none",
//                       }}
//                     >
//                       <img src={room.img} className="h-24 w-full object-cover" alt={room.name} />
//                       <div
//                         className="p-2 text-center text-xs"
//                         style={{
//                           fontFamily: "'Cinzel', serif",
//                           fontSize: "0.55rem",
//                           letterSpacing: "0.15em",
//                           color: selectedRoom.name === room.name ? "#C9A84C" : "rgba(255,255,255,0.5)",
//                         }}
//                       >
//                         {room.name}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Guests */}
//               <div>
//                 <label className="enq-label block mb-3">Number of Guests</label>
//                 <div className="flex items-center gap-5">
//                   <button
//                     type="button"
//                     onClick={() => setGuests(Math.max(1, guests - 1))}
//                     className="w-10 h-10 rounded-full border border-yellow-500/30 text-yellow-400
//                       hover:border-yellow-400 hover:bg-yellow-500/10 transition-all text-lg font-light
//                       flex items-center justify-center"
//                   >
//                     −
//                   </button>
//                   <span className="text-2xl text-white font-light w-8 text-center"
//                     style={{ fontFamily: "'Playfair Display', serif" }}>{guests}</span>
//                   <button
//                     type="button"
//                     onClick={() => setGuests(guests + 1)}
//                     className="w-10 h-10 rounded-full border border-yellow-500/30 text-yellow-400
//                       hover:border-yellow-400 hover:bg-yellow-500/10 transition-all text-lg font-light
//                       flex items-center justify-center"
//                   >
//                     +
//                   </button>
//                   <span className="text-gray-500 text-sm ml-2">
//                     {guests === 1 ? "1 Guest" : `${guests} Guests`}
//                   </span>
//                 </div>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 className="w-full py-4 rounded-sm font-bold transition-all duration-300"
//                 style={{
//                   background: "linear-gradient(135deg, #C9A84C, #F0D080, #C9A84C)",
//                   color: "black",
//                   fontFamily: "'Cinzel', serif",
//                   letterSpacing: "0.2em",
//                   fontSize: "0.7rem",
//                 }}
//                 onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 20px 60px rgba(201,168,76,0.35)" }}
//                 onMouseLeave={(e) => { e.target.style.transform = ""; e.target.style.boxShadow = "" }}
//               >
//                 Submit Enquiry
//               </button>

//               <p className="text-center text-gray-600 text-xs">
//                 We'll reach out within 2 hours to confirm your booking.
//               </p>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

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
      const res = await fetch("https://hotel-supriya-backend.onrender.com/api/enquiries", {
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