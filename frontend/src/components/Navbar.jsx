// import { useState } from "react"
// import EnquiryDialog from "./EnquiryDialog" 
// import { Link } from "react-router-dom"

// export default function Navbar() {

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 glass">

//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-gold">
//           Supriya
//         </Link>

//         {/* Navigation Links */}
//         <div className="flex gap-8 text-sm">

//           <Link to="/" className="hover:text-gold transition">
//             Home
//           </Link>

//           <Link to="/about" className="hover:text-gold transition">
//             About
//           </Link>

//           <Link to="/accommodations" className="hover:text-gold transition">
//             Rooms
//           </Link>

//           <Link to="/facilities" className="hover:text-gold transition">
//             Facilities
//           </Link>

//           <Link to="/gallery" className="hover:text-gold transition">
//             Gallery
//           </Link>

//           <Link to="/tourism" className="hover:text-gold transition">
//             Tourism
//           </Link>

//         </div>

//         {/* Enquiry Button */}

//         <button className="px-5 py-2 gold-gradient text-black font-semibold rounded-sm hover:scale-105 transition">
//           Enquiry Now
//         </button>

//       </div>

//     </nav>
//   )
// }

// import { Link } from "react-router-dom"
// import { useState } from "react"
// import EnquiryDialog from "./EnquiryDialog"

// export default function Navbar() {

//   const [open, setOpen] = useState(false)

//   return (

//     <>

//       <nav className="fixed top-0 left-0 w-full z-50 glass">

//         <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">

//           {/* Logo */}

//           <Link to="/" className="text-2xl font-bold text-gold">
//             Supriya
//           </Link>


//           {/* Navigation Links */}

//           <div className="flex gap-8 text-sm">

//             <Link to="/" className="hover:text-gold transition">
//               Home
//             </Link>

//             <Link to="/about" className="hover:text-gold transition">
//               About
//             </Link>

//             <Link to="/accommodations" className="hover:text-gold transition">
//               Rooms
//             </Link>

//             <Link to="/facilities" className="hover:text-gold transition">
//               Facilities
//             </Link>

//             <Link to="/gallery" className="hover:text-gold transition">
//               Gallery
//             </Link>

//             <Link to="/tourism" className="hover:text-gold transition">
//               Tourism
//             </Link>

//           </div>


//           {/* Enquiry Button */}

//           <button
//             onClick={() => setOpen(true)}
//             className="px-6 py-2 gold-gradient text-black font-semibold rounded-sm hover:scale-105 transition"
//           >
//             Enquiry Now
//           </button>

//         </div>

//       </nav>


//       {/* Enquiry Popup */}

//       <EnquiryDialog open={open} setOpen={setOpen} />

//     </>

//   )
// }

import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EnquiryDialog from "./EnquiryDialog"

const navLinks = [
  { to: "/",               label: "Home"       },
  { to: "/about",          label: "About"      },
  { to: "/accommodations", label: "Rooms"      },
  { to: "/facilities",     label: "Facilities" },
  { to: "/gallery",        label: "Gallery"    },
  { to: "/tourism",        label: "Tourism"    },
]

export default function Navbar() {
  const [open, setOpen]             = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          transition: color 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, #C9A84C, #F0D080);
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover, .nav-link.active { color: #C9A84C; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .logo-img {
          filter: drop-shadow(0 0 10px rgba(201,168,76,0.45));
          transition: filter 0.4s, transform 0.4s, height 0.4s;
        }
        .logo-img:hover {
          filter: drop-shadow(0 0 20px rgba(201,168,76,0.8));
          transform: scale(1.06);
        }
      `}</style>

      <motion.nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(6,6,6,0.92)"
            : "linear-gradient(to bottom, rgba(6,6,6,0.85), transparent)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/supriyalogo.png"
              alt="Hotel Supriya"
              className="logo-img"
              style={{ height: scrolled ? "44px" : "54px", width: "auto" }}
            />
            <div className="flex flex-col leading-none">
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.85rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                background: "linear-gradient(135deg, #C9A84C, #F0D080, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Supriya</span>
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.42rem",
                letterSpacing: "0.35em",
                color: "rgba(201,168,76,0.5)",
                textTransform: "uppercase",
                marginTop: "2px",
              }}>International</span>
            </div>
          </Link>

          {/* ── DESKTOP LINKS ── */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}
                className={`nav-link ${location.pathname === link.to ? "active" : ""}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setOpen(true)} className="cta-btn px-7 py-2.5 rounded-sm">
              Enquiry Now
            </button>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} className="block h-px bg-yellow-500/70"
                style={{ width: i === 1 ? 20 : 26 }}
                animate={mobileOpen
                  ? i === 0 ? { rotate: 45,  y: 8,  width: 26 }
                  : i === 1 ? { opacity: 0 }
                  :           { rotate: -45, y: -8, width: 26 }
                  : { rotate: 0, y: 0, opacity: 1, width: i === 1 ? 20 : 26 }
                }
                transition={{ duration: 0.3 }}
              />
            ))}
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div className="md:hidden glass border-t border-yellow-500/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}>
              {/* Logo centered in mobile drawer */}
              <div className="flex justify-center pt-6 pb-1">
                <img src="/supriyalogo.png" alt="Hotel Supriya"
                  style={{ height: "52px", width: "auto", filter: "drop-shadow(0 0 10px rgba(201,168,76,0.5))" }} />
              </div>
              <div className="px-8 py-4 flex flex-col gap-5 pb-8">
                {navLinks.map((link, i) => (
                  <motion.div key={link.to}
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}>
                    <Link to={link.to}
                      className={`nav-link text-base ${location.pathname === link.to ? "active" : ""}`}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <button onClick={() => { setOpen(true); setMobileOpen(false) }}
                  className="cta-btn px-7 py-3 rounded-sm mt-2 w-full text-center">
                  Enquiry Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <EnquiryDialog open={open} setOpen={setOpen} />
    </>
  )
}