import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { GalleryCarousel } from "../components/GalleryCarousel"
import ReviewSection from "../components/ReviewSection"

/* ── Floating gold particles ── */
function GoldParticles() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 10,
    size: 1 + Math.random() * 3,
    opacity: 0.2 + Math.random() * 0.6,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, #FFD700, #B8860B)",
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px #FFD700`,
          }}
          animate={{
            y: [0, -(window.innerHeight + 50)],
            x: [0, (Math.random() - 0.5) * 120],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  )
}

/* ── 3D Tilt Card ── */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rx = ((e.clientY - rect.top  - rect.height / 2) / rect.height) * -18
    const ry = ((e.clientX - rect.left - rect.width  / 2) / rect.width)  *  18
    setRot({ x: rx, y: ry })
  }
  return (
    <motion.div ref={ref} className={className}
      onMouseMove={handleMove} onMouseLeave={() => setRot({ x: 0, y: 0 })}
      animate={{ rotateX: rot.x, rotateY: rot.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >{children}</motion.div>
  )
}

/* ── Animated counter ── */
function Counter({ to }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])
  useEffect(() => {
    if (!started) return
    let frame
    const step = () => {
      setVal((v) => { if (v >= to) return to; frame = requestAnimationFrame(step); return v + Math.ceil((to - v) / 20) })
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [started, to])
  return <span ref={ref}>{val}</span>
}

/* ── Section title ── */
function SectionTitle({ eyebrow, title, center = false }) {
  return (
    <motion.div className={`mb-16 ${center ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.9 }}>
      <div className="text-yellow-500 tracking-[0.4em] text-xs uppercase mb-4"
        style={{ fontFamily: "'Cinzel', serif" }}>{eyebrow}</div>
      <h2 className="text-5xl md:text-7xl font-thin text-white"
        style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}>{title}</h2>
      <div className="mt-6 flex items-center gap-4" style={{ justifyContent: center ? "center" : "flex-start" }}>
        <div className="h-px w-16 bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="h-px w-8 bg-yellow-500/40" />
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate()
  const heroRef  = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "40%"])
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0])
  const heroScale   = useTransform(heroScroll, [0, 1], [1, 1.15])
  const [activeRoom, setActiveRoom] = useState(0)

  const rooms = [
    { name: "Deluxe Room",    desc: "Spacious comfort with modern amenities, perfect for the discerning traveler.", price: "₹2,680", tag: "Most Popular",     img: "https://hotelsupriyainternational.com/images/room/deluxeroom.jpg",    features: ["King Bed", "Mountain View", "Free WiFi", "Mini Bar"]          },
    { name: "Executive Room", desc: "Elevated elegance with premium furnishings and exclusive business amenities.", price: "₹3,125", tag: "Business Favorite", img: "https://hotelsupriyainternational.com/images/room/executiveroom.jpg", features: ["Work Desk", "Lounge Access", "Breakfast", "Premium TV"]       },
    { name: "Suite Room",     desc: "The pinnacle of luxury — your private sanctuary in the heart of Sirsi.",      price: "₹4,465", tag: "Ultimate Luxury",   img: "https://hotelsupriyainternational.com/images/room/suiteroom.jpg",     features: ["Living Room", "Jacuzzi", "Butler Service", "City View"]       },
  ]

  const galleryItems = [
    { img: "https://hotelsupriyainternational.com/images/gallery/1.jpg",  tag: "Hospitality", title: "Grand Lobby",       desc: "Where first impressions become memories" },
    { img: "https://hotelsupriyainternational.com/images/gallery/2.jpg",  tag: "Dining",      title: "Fine Restaurant",   desc: "A culinary journey through flavors"       },
    { img: "https://hotelsupriyainternational.com/images/gallery/3.jpg",  tag: "Events",      title: "Banquet Hall",      desc: "Celebrate life's finest moments"          },
    { img: "https://hotelsupriyainternational.com/images/gallery/4.jpg",  tag: "Leisure",     title: "Recreation",        desc: "Unwind and rejuvenate in style"           },
    { img: "https://hotelsupriyainternational.com/images/tourism/1.jpg",  tag: "Explore",     title: "Local Heritage",    desc: "Discover the magic of Sirsi"              },
    { img: "https://hotelsupriyainternational.com/images/tourism/2.jpg",  tag: "Nature",      title: "Lush Surroundings", desc: "Immersed in Karnataka's beauty"           },
  ]

  const facilities = [
    { icon: "⚡", label: "EV Charging",     desc: "Future-ready charging stations" },
    { icon: "🍽", label: "Fine Dining",     desc: "Award-winning cuisine"          },
    { icon: "📶", label: "Free WiFi",       desc: "High-speed connectivity"        },
    { icon: "🅿", label: "Valet Parking",   desc: "Complimentary secure parking"   },
    { icon: "🎉", label: "Banquet Halls",   desc: "Events for 500+ guests"         },
    { icon: "🌿", label: "Garden Terrace",  desc: "Serene outdoor spaces"          },
    { icon: "💼", label: "Business Center", desc: "Full conference facilities"     },
    { icon: "🛎", label: "24/7 Concierge",  desc: "Always at your service"         },
  ]

  return (
    <div className="bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Cormorant+Garamond:wght@300;400;500&family=Cinzel:wght@400;700&display=swap');
        .gold-text{background:linear-gradient(135deg,#C9A84C 0%,#F0D080 40%,#C9A84C 60%,#8B6914 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .glass-card{background:linear-gradient(135deg,rgba(201,168,76,0.06) 0%,rgba(0,0,0,0.4) 100%);backdrop-filter:blur(20px);border:1px solid rgba(201,168,76,0.18);}
        .noise-overlay::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;opacity:0.35;}
        .shimmer{background:linear-gradient(90deg,transparent,rgba(201,168,76,0.15),transparent);background-size:200% 100%;animation:shimmer 3s infinite;}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .cta-btn{position:relative;background:linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C);color:black;font-family:'Cinzel',serif;letter-spacing:0.15em;font-size:0.75rem;overflow:hidden;transition:all 0.4s;font-weight:700;}
        .cta-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#F0D080,#C9A84C);opacity:0;transition:opacity 0.4s;}
        .cta-btn:hover::before{opacity:1;}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 20px 60px rgba(201,168,76,0.4);}
        .room-tab{transition:all 0.3s;}
        .room-tab.active{background:linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.05));border-color:rgba(201,168,76,0.5);}
        ::selection{background:rgba(201,168,76,0.3);color:white;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:black;}
        ::-webkit-scrollbar-thumb{background:#8B6914;border-radius:2px;}
      `}</style>

      <GoldParticles />

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden noise-overlay">
        <motion.div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)", y: heroY, scale: heroScale }} />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.5) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          transform: "perspective(800px) rotateX(60deg) translateY(-30%)",
          transformOrigin: "50% 100%",
        }} />
        <motion.div className="absolute w-[700px] h-[700px] rounded-full"
          style={{ border: "1px solid rgba(201,168,76,0.12)", boxShadow: "0 0 80px rgba(201,168,76,0.05) inset" }}
          animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute w-[500px] h-[500px] rounded-full"
          style={{ border: "1px solid rgba(201,168,76,0.18)" }}
          animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />

        {/* SVG Hotel */}
        <motion.div className="absolute" style={{ y: heroY }}
          initial={{ opacity: 0, scale: 0.7, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}>
          <svg width="400" height="480" viewBox="0 0 400 480" fill="none">
            <defs>
              <linearGradient id="bG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.9"/>
                <stop offset="40%"  stopColor="#F0D080" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#8B6914" stopOpacity="0.4"/>
              </linearGradient>
              <linearGradient id="glG" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%"   stopColor="#FFD700" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
              </linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="sGlow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <ellipse cx="200" cy="460" rx="180" ry="20" fill="url(#glG)" opacity="0.5"/>
            <rect x="120" y="100" width="160" height="360" fill="url(#bG)" opacity="0.15"/>
            <rect x="120" y="100" width="160" height="360" stroke="url(#bG)" strokeWidth="1" fill="none" filter="url(#glow)"/>
            <rect x="60"  y="200" width="70"  height="260" fill="url(#bG)" opacity="0.1"/>
            <rect x="60"  y="200" width="70"  height="260" stroke="url(#bG)" strokeWidth="0.5" fill="none"/>
            <rect x="270" y="200" width="70"  height="260" fill="url(#bG)" opacity="0.1"/>
            <rect x="270" y="200" width="70"  height="260" stroke="url(#bG)" strokeWidth="0.5" fill="none"/>
            <polygon points="200,20 215,100 185,100" fill="url(#bG)" opacity="0.9" filter="url(#sGlow)"/>
            <line x1="200" y1="20" x2="200" y2="100" stroke="#FFD700" strokeWidth="1.5" filter="url(#sGlow)"/>
            <rect x="145" y="95" width="110" height="8" fill="#C9A84C" opacity="0.8" filter="url(#glow)"/>
            {Array.from({ length: 8 }, (_, row) => Array.from({ length: 5 }, (_, col) => (
              <rect key={`w-${row}-${col}`} x={133+col*28} y={115+row*40} width={16} height={24} fill="#FFD700" opacity={0.15} filter="url(#glow)"/>
            )))}
            {Array.from({ length: 7 }, (_, i) => (
              <line key={`b-${i}`} x1="120" y1={155+i*40} x2="280" y2={155+i*40} stroke="#C9A84C" strokeWidth="0.5" opacity="0.4"/>
            ))}
            <path d="M170 460 L170 420 Q200 400 230 420 L230 460 Z" stroke="url(#bG)" strokeWidth="1" fill="url(#bG)" opacity="0.3" filter="url(#glow)"/>
            <circle cx="200" cy="15" r="3" fill="#FFD700" filter="url(#sGlow)"/>
            <circle cx="185" cy="30" r="1.5" fill="#C9A84C" opacity="0.7"/>
            <circle cx="215" cy="35" r="1.5" fill="#C9A84C" opacity="0.7"/>
          </svg>
        </motion.div>

        {/* Hero text */}
        <motion.div className="absolute text-center z-10"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}>
          <motion.div className="text-xs tracking-[0.6em] text-yellow-500/70 mb-6 uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}>
            Est. Sirsi, Karnataka
          </motion.div>
          <motion.h1 className="text-[80px] md:text-[120px] leading-none gold-text"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300 }}
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.2 }}>
            Hotel<br />Supriya
          </motion.h1>
          <motion.div className="text-yellow-500/50 text-xs tracking-[0.8em] mt-4 uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.6 }}>
            International
          </motion.div>
          <motion.div className="mt-2 text-gray-400 text-lg font-light tracking-widest"
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.9 }}>
            Where Luxury Meets Legacy
          </motion.div>
          <motion.div className="mt-10 flex gap-6 justify-center"
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.2 }}>
            <button onClick={() => navigate("/accommodations")} className="cta-btn px-10 py-4 rounded-sm z-10 relative">
              Reserve Your Stay
            </button>
            <button onClick={() => navigate("/about")}
              className="px-10 py-4 rounded-sm border border-yellow-500/30 text-yellow-400/80 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem" }}>
              Explore Hotel
            </button>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <div className="text-yellow-500/40 text-xs tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>Scroll</div>
          <div className="w-px h-16 bg-gradient-to-b from-yellow-500/60 to-transparent" />
        </motion.div>
      </section>

      {/* ══ STORY OPENER ══ */}
      <section className="py-40 px-10 md:px-24 relative">
        <div className="absolute left-0 top-1/2 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent)", transform: "translateY(-50%)" }} />
        <motion.div className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="text-yellow-500/60 text-xs tracking-[0.5em] uppercase mb-8"
            style={{ fontFamily: "'Cinzel', serif" }}>Our Story</div>
          <p className="text-3xl md:text-4xl text-gray-200 leading-relaxed font-light"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            "Nestled in the verdant heart of{" "}
            <em className="gold-text not-italic">Sirsi</em>, Hotel Supriya International
            was born from a singular vision — to craft an experience where{" "}
            <em className="gold-text not-italic">every moment</em> feels like an arrival."
          </p>
          <div className="mt-12 flex justify-center gap-8 md:gap-16 flex-wrap">
            {[["3+", "Years of Legacy"], ["100+", "Luxury Rooms"], ["5K+", "Happy Guests"], ["4.8★", "Avg. Rating"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl gold-text font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{num}</div>
                <div className="text-gray-500 text-xs tracking-widest mt-1 uppercase"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ ABOUT ══ */}
      <section className="py-20 px-10 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <SectionTitle eyebrow="Discover" title={"A World\nApart"} />
            <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">
              Hotel Supriya International is more than a destination — it is an immersive world of refined comfort.
              From our handcrafted interiors to our curated dining, every detail speaks of our dedication to exceptional hospitality.
            </p>
            <p className="text-gray-500 leading-relaxed font-light">
              Located in the cultural hub of Sirsi, Karnataka, we are your gateway to the Western Ghats'
              breathtaking wilderness, ancient temples, and vibrant local traditions.
            </p>
            <button onClick={() => navigate("/about")} className="mt-10 cta-btn px-8 py-3 rounded-sm">
              Discover More
            </button>
          </motion.div>
          <motion.div className="relative" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <TiltCard className="relative z-10">
              <div className="glass-card rounded-3xl overflow-hidden">
                <img src="https://hotelsupriyainternational.com/images/about/about.jpg" className="w-full h-96 object-cover" alt="Hotel Supriya" />
                <div className="p-8">
                  <div className="flex gap-6 flex-wrap">
                    {[["Fine Dining", "Awarded"], ["Location", "Central Sirsi"], ["Check-in", "24/7"]].map(([k, v]) => (
                      <div key={k}>
                        <div className="text-yellow-500/60 text-xs tracking-widest uppercase mb-1"
                          style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>{k}</div>
                        <div className="text-white text-sm">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-3xl border border-yellow-500/10 -z-0" />
            <div className="absolute -bottom-4 -right-4 w-48 h-48 rounded-2xl border border-yellow-500/20 -z-0" />
          </motion.div>
        </div>
      </section>

      {/* ══ ROOMS ══ */}
      <section className="py-32 px-10 md:px-20 relative">
        <div className="absolute right-0 top-0 w-96 h-96"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.04), transparent)" }} />
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="Accommodations" title="Rooms & Suites" center />
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {rooms.map((r, i) => (
              <button key={i} onClick={() => setActiveRoom(i)}
                className={`room-tab glass-card px-6 py-3 rounded-full border text-sm transition-all
                  ${activeRoom === i ? "active text-yellow-400 border-yellow-500/50" : "text-gray-500 border-yellow-500/20 hover:text-gray-300"}`}
                style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
                {r.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeRoom}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-12 items-center">
              <TiltCard>
                <div className="glass-card rounded-3xl overflow-hidden">
                  <div className="relative">
                    <img src={rooms[activeRoom].img} className="w-full h-80 object-cover" alt={rooms[activeRoom].name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/40 rounded-full px-4 py-1 text-yellow-400 text-xs"
                      style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.2em" }}>
                      {rooms[activeRoom].tag}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-3xl gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>{rooms[activeRoom].price}</div>
                      <div className="text-gray-300 text-xs">per night</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
              <div>
                <h3 className="text-4xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300 }}>
                  {rooms[activeRoom].name}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">{rooms[activeRoom].desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {rooms[activeRoom].features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate("/accommodations")} className="cta-btn px-10 py-4 rounded-sm">
                  View All Rooms
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══ FACILITIES ══ */}
      <section className="py-32 px-10 md:px-20 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.03) 0%, transparent 50%, rgba(201,168,76,0.02) 100%)" }} />
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="Amenities" title="World-Class Facilities" center />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {facilities.map((f, i) => (
              <motion.div key={i} className="glass-card rounded-2xl p-8 text-center group cursor-default"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <div className="text-yellow-400 text-sm mb-2 tracking-widest uppercase"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem" }}>{f.label}</div>
                <div className="text-gray-500 text-xs">{f.desc}</div>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-20 glass-card rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shimmer"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {[["100", "+", "Rooms"], ["500", "+", "Events Hosted"], ["3", "+", "Years Legacy"], ["4.8", "★", "Rating"]].map(([n, s, l]) => (
              <div key={l}>
                <div className="text-5xl gold-text font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <Counter to={parseInt(n)} />{s}
                </div>
                <div className="text-gray-500 text-xs tracking-widest mt-2 uppercase"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>{l}</div>
              </div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <button onClick={() => navigate("/facilities")}
              className="px-10 py-3 rounded-sm border border-yellow-500/30 text-yellow-400/70 hover:border-yellow-400 hover:text-yellow-400 transition-all text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem" }}>
              View All Facilities
            </button>
          </div>
        </div>
      </section>

      {/* ══ GALLERY CAROUSEL ══ */}
      <section className="py-32 overflow-hidden">
        <div className="px-10 md:px-20">
          <SectionTitle eyebrow="Gallery" title="Captured Moments" />
        </div>
        <GalleryCarousel items={galleryItems} />
        <div className="text-center mt-12">
          <button onClick={() => navigate("/gallery")} className="cta-btn px-10 py-3 rounded-sm">
            View Full Gallery
          </button>
        </div>
      </section>

      {/* ══ EXPLORE SIRSI ══ */}
      <section className="py-32 px-10 md:px-20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="Local Discovery" title="Explore Sirsi" center />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: "https://hotelsupriyainternational.com/images/tourism/1.jpg", title: "Sahasralinga",  dist: "18 km away"  },
              { img: "https://hotelsupriyainternational.com/images/tourism/2.jpg", title: "Unchalli Falls", dist: "35 km away"  },
              { img: "https://hotelsupriyainternational.com/images/tourism/5.jpg", title: "Yava Caves",     dist: "City Center" },
            ].map((place, i) => (
              <motion.div key={i} className="group relative overflow-hidden rounded-3xl cursor-pointer"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }} onClick={() => navigate("/tourism")}>
                <img src={place.img} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" alt={place.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="text-yellow-500/60 text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>{place.dist}</div>
                  <div className="text-white text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{place.title}</div>
                </div>
                <div className="absolute inset-0 border border-yellow-500/0 group-hover:border-yellow-500/20 rounded-3xl transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate("/tourism")}
              className="px-10 py-3 rounded-sm border border-yellow-500/30 text-yellow-400/70 hover:border-yellow-400 hover:text-yellow-400 transition-all text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem" }}>
              Explore All Attractions
            </button>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS (replaces static testimonial) ══ */}
      <ReviewSection />

      {/* ══ FINAL CTA ══ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(600px) rotateX(65deg) translateY(20%)",
          transformOrigin: "50% 100%",
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <motion.div className="text-center relative z-10"
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="text-yellow-500/60 text-xs tracking-[0.6em] uppercase mb-8"
            style={{ fontFamily: "'Cinzel', serif" }}>Begin Your Journey</div>
          <h2 className="text-6xl md:text-9xl leading-none gold-text"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300 }}>
            Stay in<br />Legend
          </h2>
          <p className="text-gray-400 text-lg mt-8 mb-12 font-light">
            Experience the finest hospitality in Karnataka's heartland.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => navigate("/accommodations")} className="cta-btn px-14 py-5 rounded-sm">
              Reserve Now
            </button>
            <a href="tel:+91"
              className="px-14 py-5 rounded-sm border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 text-xs tracking-widest uppercase text-center"
              style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem" }}>
              Call Us
            </a>
          </div>
          <p className="text-gray-600 text-sm mt-8">
            📍 Sirsi, Uttara Kannada, Karnataka — hotelsupriyainternational.com
          </p>
        </motion.div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="py-16 px-10 md:px-20 border-t border-yellow-500/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-yellow-400 tracking-[0.4em] uppercase mb-2"
              style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem" }}>Hotel Supriya International</div>
            <div className="text-gray-600 text-sm">Sirsi, Karnataka, India</div>
          </div>
          <div className="flex gap-6 md:gap-10 flex-wrap justify-center text-gray-600 tracking-widest uppercase"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>
            {[["Rooms", "/accommodations"], ["About", "/about"], ["Gallery", "/gallery"], ["Tourism", "/tourism"], ["Facilities", "/facilities"]].map(([label, path]) => (
              <button key={label} onClick={() => navigate(path)} className="hover:text-yellow-400 transition-colors">{label}</button>
            ))}
          </div>
          <div className="text-gray-700 text-xs">© 2024 Hotel Supriya International</div>
        </div>
      </footer>
    </div>
  )
}