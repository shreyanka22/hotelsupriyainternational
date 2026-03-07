// import Hero3D from "../components/Hero3D"
// import { motion } from "framer-motion"

// const rooms = [
//   {
//     name: "Deluxe Room AC",
//     price: "₹2680",
//     image: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg",
//   },
//   {
//     name: "Deluxe AC Twin Bed",
//     price: "₹2680",
//     image: "https://hotelsupriyainternational.com/images/room/deluxeactwinbed.jpeg",
//   },
//   {
//     name: "Deluxe Room Non AC",
//     price: "₹2235",
//     image: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg",
//   },
//   {
//     name: "Executive AC Room",
//     price: "₹3125",
//     image: "https://hotelsupriyainternational.com/images/room/executiveroom.jpg",
//   },
//   {
//     name: "Non AC Room",
//     price: "₹1340",
//     image: "https://hotelsupriyainternational.com/images/room/nonacroom.jpg",
//   },
//   {
//     name: "Suite Room",
//     price: "₹4465",
//     image: "https://hotelsupriyainternational.com/images/room/suiteroom.jpg",
//   },
// ]

// export default function Accommodations() {

//   return (

//     <div className="min-h-screen pt-32 px-6 max-w-7xl mx-auto">

//       <h1 className="text-4xl font-bold text-gold mb-12 text-center">
//         Our Rooms
//       </h1>

//       <div className="grid md:grid-cols-3 gap-10">

//         {rooms.map((room, index) => (

//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.05 }}
//             className="glass rounded-lg overflow-hidden"
//           >

//             <img
//               src={room.image}
//               className="w-full h-64 object-cover"
//             />

//             <div className="p-6">

//               <h2 className="text-xl font-semibold mb-2">
//                 {room.name}
//               </h2>

//               <p className="text-gold mb-4">
//                 Starting from {room.price}
//               </p>

//               <button className="px-4 py-2 gold-gradient text-black font-semibold rounded-sm hover:scale-105 transition">
//                 Enquiry
//               </button>

//             </div>

//           </motion.div>

//         ))}

//       </div>

//     </div>

//   )
// }
// import { motion } from "framer-motion"
// import Hero3D from "../components/Hero3D"

// const rooms = [
//   {
//     name: "Deluxe Room AC",
//     price: "₹2680",
//     image: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg",
//   },
//   {
//     name: "Deluxe AC Twin Bed",
//     price: "₹2680",
//     image: "https://hotelsupriyainternational.com/images/room/deluxeactwinbed.jpeg",
//   },
//   {
//     name: "Deluxe Room Non AC",
//     price: "₹2235",
//     image: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg",
//   },
//   {
//     name: "Executive AC Room",
//     price: "₹3125",
//     image: "https://hotelsupriyainternational.com/images/room/executiveroom.jpg",
//   },
//   {
//     name: "Non AC Room",
//     price: "₹1340",
//     image: "https://hotelsupriyainternational.com/images/room/nonacroom.jpg",
//   },
//   {
//     name: "Suite Room",
//     price: "₹4465",
//     image: "https://hotelsupriyainternational.com/images/room/suiteroom.jpg",
//   },
// ]

// export default function Accommodations() {

//   return (

//     <div className="relative min-h-screen pt-32 px-6">

//       {/* 3D Background */}
//       <Hero3D />

//       <div className="max-w-7xl mx-auto">

//         <h1 className="text-5xl font-bold text-gold mb-16 text-center">
//           Our Rooms
//         </h1>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

//           {rooms.map((room, index) => (

//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               className="glass rounded-xl overflow-hidden"
//             >

//               <img
//                 src={room.image}
//                 className="w-full h-80 object-cover"
//               />

//               <div className="p-8">

//                 <h2 className="text-2xl font-semibold mb-3">
//                   {room.name}
//                 </h2>

//                 <p className="text-gold text-lg mb-6">
//                   Starting from {room.price}
//                 </p>

//                 <button className="px-5 py-2 gold-gradient text-black font-semibold rounded-sm hover:scale-105 transition">
//                   Enquiry Now
//                 </button>

//               </div>

//             </motion.div>

//           ))}

//         </div>

//       </div>

//     </div>

//   )
// }

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"

/* ── 3D tilt card ── */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rx = ((e.clientY - rect.top  - rect.height / 2) / rect.height) * -14
    const ry = ((e.clientX - rect.left - rect.width  / 2) / rect.width)  *  14
    setRot({ x: rx, y: ry })
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      animate={{ rotateX: rot.x, rotateY: rot.y }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      {children}
    </motion.div>
  )
}

/* ── Floating particles ── */
function Particles() {
  const pts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    dur: 7 + Math.random() * 9,
    size: 1 + Math.random() * 2.5,
    op: 0.2 + Math.random() * 0.5,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pts.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, bottom: -10,
            width: p.size, height: p.size,
            background: "radial-gradient(circle, #FFD700, #B8860B)",
            boxShadow: `0 0 ${p.size * 3}px #FFD700`,
            opacity: p.op,
          }}
          animate={{ y: [0, -(window.innerHeight + 60)], opacity: [0, p.op, p.op, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  )
}

const rooms = [
  {
    name: "Deluxe Room AC",
    price: "₹2,680",
    tag: "Most Popular",
    category: "Deluxe",
    image: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg",
    features: ["AC", "King Bed", "City View", "Free WiFi"],
    desc: "Spacious and elegantly appointed, ideal for couples or solo travelers seeking refined comfort.",
  },
  {
    name: "Deluxe AC Twin Bed",
    price: "₹2,680",
    tag: "Great for Pairs",
    category: "Deluxe",
    image: "https://hotelsupriyainternational.com/images/room/deluxeactwinbed.jpeg",
    features: ["AC", "Twin Beds", "Wardrobe", "Free WiFi"],
    desc: "Twin-bed layout perfect for friends or colleagues traveling together in style.",
  },
  {
    name: "Deluxe Room Non AC",
    price: "₹2,235",
    tag: "Budget Luxury",
    category: "Deluxe",
    image: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg",
    features: ["Fan Cooled", "King Bed", "Garden View", "Free WiFi"],
    desc: "All the elegance of a Deluxe room with natural ventilation and a serene ambiance.",
  },
  {
    name: "Executive AC Room",
    price: "₹3,125",
    tag: "Business Choice",
    category: "Executive",
    image: "https://hotelsupriyainternational.com/images/room/executiveroom.jpg",
    features: ["AC", "Work Desk", "Premium TV", "Breakfast"],
    desc: "Designed for the discerning professional — productivity meets luxury seamlessly.",
  },
  {
    name: "Non AC Room",
    price: "₹1,340",
    tag: "Value Stay",
    category: "Standard",
    image: "https://hotelsupriyainternational.com/images/room/nonacroom.jpg",
    features: ["Fan Cooled", "Comfortable Bed", "Free WiFi", "Room Service"],
    desc: "A warm, clean, and affordable option without compromising on our signature hospitality.",
  },
  {
    name: "Suite Room",
    price: "₹4,465",
    tag: "Ultimate Luxury",
    category: "Suite",
    image: "https://hotelsupriyainternational.com/images/room/suiteroom.jpg",
    features: ["AC", "Living Room", "Jacuzzi", "Butler Service"],
    desc: "The crown jewel of Hotel Supriya — a sanctuary of unmatched opulence and privacy.",
  },
]

const categories = ["All", "Deluxe", "Executive", "Standard", "Suite"]

export default function Accommodations() {
  const [filter, setFilter] = useState("All")
  const [enquireRoom, setEnquireRoom] = useState(null)

  const filtered = filter === "All" ? rooms : rooms.filter((r) => r.category === filter)

  return (
    <div
      className="relative min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', serif", background: "#060606" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Cormorant+Garamond:wght@300;400;500&family=Cinzel:wght@400;700&display=swap');
        .gold-text{background:linear-gradient(135deg,#C9A84C 0%,#F0D080 40%,#C9A84C 60%,#8B6914 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .glass{background:linear-gradient(135deg,rgba(201,168,76,0.05),rgba(0,0,0,0.45));backdrop-filter:blur(18px);border:1px solid rgba(201,168,76,0.18);}
        .cta-btn{position:relative;background:linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C);color:black;font-family:'Cinzel',serif;letter-spacing:0.15em;font-size:0.65rem;font-weight:700;overflow:hidden;transition:all 0.35s;}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 20px 60px rgba(201,168,76,0.35);}
        .filter-btn{font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;transition:all 0.3s;border:1px solid rgba(201,168,76,0.2);color:rgba(255,255,255,0.45);}
        .filter-btn:hover{border-color:rgba(201,168,76,0.5);color:#C9A84C;}
        .filter-btn.active{background:linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.05));border-color:rgba(201,168,76,0.5);color:#C9A84C;}
      `}</style>

      <Particles />

      {/* ── Page Hero ── */}
      <div className="relative pt-32 pb-16 flex flex-col items-center overflow-hidden">
        {/* perspective grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(55deg) translateY(-25%)",
          transformOrigin: "50% 100%",
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060606]" />
        {/* radial glow */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,168,76,0.07), transparent)" }} />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.6rem", letterSpacing: "0.5em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }} className="mb-4">
            Hotel Supriya International
          </div>
          <h1 className="text-6xl md:text-8xl font-thin gold-text" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300 }}>
            Rooms &amp;<br />Suites
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-16 bg-yellow-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
            <div className="h-px w-8 bg-yellow-500/25" />
          </div>
          <p className="text-gray-400 mt-4 text-lg font-light tracking-wide">
            Choose your perfect sanctuary in Sirsi
          </p>
        </motion.div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex justify-center gap-3 flex-wrap px-6 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-btn px-6 py-2 rounded-full ${filter === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Room Grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((room, i) => (
              <motion.div
                key={room.name}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TiltCard className="h-full">
                  <div className="glass rounded-3xl overflow-hidden h-full flex flex-col group">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={room.image}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-108"
                        alt={room.name}
                        style={{ transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Tag badge */}
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-yellow-400 border border-yellow-500/40"
                        style={{
                          background: "rgba(0,0,0,0.5)",
                          backdropFilter: "blur(10px)",
                          fontFamily: "'Cinzel',serif",
                          fontSize: "0.55rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                        }}
                      >
                        {room.tag}
                      </div>
                      {/* Price */}
                      <div className="absolute bottom-4 right-4 text-right">
                        <div className="gold-text text-2xl" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300 }}>
                          {room.price}
                        </div>
                        <div className="text-gray-400 text-xs">per night</div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="text-2xl text-white mb-3" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300 }}>
                        {room.name}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{room.desc}</p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 mb-7">
                        {room.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-gray-400 text-xs">
                            <div className="w-1 h-1 rounded-full bg-yellow-500 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => setEnquireRoom(room.name)}
                        className="cta-btn w-full py-3 rounded-sm"
                      >
                        Enquiry Now
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Enquiry mini-modal ── */}
      <AnimatePresence>
        {enquireRoom && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnquireRoom(null)}
          >
            <motion.div
              className="glass rounded-3xl p-10 max-w-md w-full text-center"
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-yellow-500/50 text-xs tracking-widest uppercase mb-4"
                style={{ fontFamily: "'Cinzel',serif", fontSize: "0.55rem" }}>Enquiry for</div>
              <h3 className="text-3xl gold-text mb-6" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300 }}>
                {enquireRoom}
              </h3>
              <p className="text-gray-400 text-sm mb-8">
                Please call us or use the main Enquiry form to book this room.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="tel:+91" className="cta-btn px-8 py-3 rounded-sm">Call Now</a>
                <button onClick={() => setEnquireRoom(null)}
                  className="px-8 py-3 rounded-sm border border-yellow-500/30 text-yellow-400/70 text-xs
                    hover:border-yellow-400 transition-colors"
                  style={{ fontFamily: "'Cinzel',serif", letterSpacing: "0.15em" }}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}