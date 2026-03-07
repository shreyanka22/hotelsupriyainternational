// import { motion } from "framer-motion"
// import Hero3D from "../components/Hero3D"

// const restaurants = [

// {
// name: "Latitude",
// img: "https://hotelsupriyainternational.com/images/restaurant/latitude.jpg"
// },

// {
// name: "Supriya Restaurant",
// img: "https://hotelsupriyainternational.com/images/restaurant/supriya.jpg"
// },

// {
// name: "Vision I - Meeting Hall",
// img: "https://hotelsupriyainternational.com/images/restaurant/vision1meeting.jpg"
// },

// {
// name: "Vision II - Seminar Hall",
// img: "https://hotelsupriyainternational.com/images/restaurant/vision2seminar.jpg"
// },

// {
// name: "Sambhrama Banquet",
// img: "https://hotelsupriyainternational.com/images/restaurant/sambramabanquet.jpg"
// },

// {
// name: "Mosaic Party Hall",
// img: "https://hotelsupriyainternational.com/images/restaurant/mosaicparty.jpg"
// }

// ]

// export default function About(){

// return(

// <div className="relative min-h-screen pt-32 px-6">

// <Hero3D/>

// <div className="max-w-[1400px] mx-auto space-y-24">

// {/* Hotel Intro */}

// <div className="grid md:grid-cols-2 gap-12 items-center">

// <img
// src="https://hotelsupriyainternational.com/images/about/about.jpg"
// className="rounded-xl"
// />

// <div className="space-y-6">

// <h1 className="text-5xl text-gold font-bold">
// Hotel Supriya International
// </h1>

// <p className="text-gray-300 leading-relaxed">

// Hotel Supriya International is one of the most comfortable and well-equipped
// hotels in Sirsi. Located in the heart of the city, the hotel offers
// luxurious rooms, excellent dining experiences, and modern facilities
// for business meetings, family gatherings, and special events.

// Guests can enjoy warm hospitality, modern amenities, and convenient
// access to the major tourist attractions around Sirsi.

// </p>

// </div>

// </div>


// {/* Dining & Halls */}

// <div>

// <h2 className="text-4xl text-gold text-center mb-16">
// Dining & Event Spaces
// </h2>

// <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

// {restaurants.map((item,index)=> (

// <motion.div
// key={index}
// whileHover={{scale:1.05}}
// className="glass rounded-xl overflow-hidden"
// >

// <img
// src={item.img}
// className="w-full h-72 object-cover"
// />

// <div className="p-5">

// <h3 className="text-lg">
// {item.name}
// </h3>

// </div>

// </motion.div>

// ))}

// </div>

// </div>

// </div>

// </div>

// )

// }


import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

/* shared tilt */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null)
  const [rot, setRot] = [{ x: 0, y: 0 }, () => {}]
  return (
    <motion.div
      ref={ref}
      className={className}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

const venues = [
  { name: "Latitude",              tag: "Rooftop Dining",    img: "https://hotelsupriyainternational.com/images/restaurant/latitude.jpg" },
  { name: "Supriya Restaurant",    tag: "Fine Dining",       img: "https://hotelsupriyainternational.com/images/restaurant/supriya.jpg" },
  { name: "Vision I",              tag: "Meeting Hall",      img: "https://hotelsupriyainternational.com/images/restaurant/vision1meeting.jpg" },
  { name: "Vision II",             tag: "Seminar Hall",      img: "https://hotelsupriyainternational.com/images/restaurant/vision2seminar.jpg" },
  { name: "Sambhrama",             tag: "Banquet Hall",      img: "https://hotelsupriyainternational.com/images/restaurant/sambramabanquet.jpg" },
  { name: "Mosaic Party Hall",     tag: "Celebration Space", img: "https://hotelsupriyainternational.com/images/restaurant/mosaicparty.jpg" },
]

const milestones = [
  { year: "2021", event: "Hotel Supriya founded in the heart of Sirsi" },
  { year: "2022", event: "Expanded with Executive wing and Sambhrama Banquet" },
  { year: "2023", event: "Launched Latitude rooftop dining experience" },
  { year: "2024", event: "Celebrated 3+ years of unmatched hospitality" },
  { year: "2025", event: "EV Charging & modern infrastructure upgrade" },
  
]

export default function About() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

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
        .venue-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .venue-card:hover { transform: translateY(-8px); }
      `}</style>

      {/* ── Page Hero ── */}
      <div ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(55deg) translateY(-25%)",
          transformOrigin: "50% 100%",
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060606]" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,168,76,0.07), transparent)" }} />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.6rem", letterSpacing: "0.5em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }} className="mb-4">
            Our Heritage
          </div>
          <h1 className="text-6xl md:text-8xl font-thin gold-text" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300 }}>
            Our Story
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-16 bg-yellow-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" /><div className="h-px w-8 bg-yellow-500/25" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 space-y-40">

        {/* ── Hotel Intro ── */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="glass rounded-3xl overflow-hidden">
              <img
                src="https://hotelsupriyainternational.com/images/about/about.jpg"
                className="w-full h-[480px] object-cover"
                alt="Hotel Supriya"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 text-center w-36"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <div className="text-4xl gold-text font-thin" style={{ fontFamily: "'Playfair Display',serif" }}>3+</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }}>
                Years of<br />Legacy
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }} className="mb-4">
              Est. Sirsi, Karnataka
            </div>
            <h2 className="text-5xl md:text-6xl font-thin text-white mb-8" style={{ fontFamily: "'Playfair Display',serif" }}>
              Hotel Supriya<br />
              <span className="gold-text">International</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
              Born from a passion for genuine hospitality, Hotel Supriya International
              has been the beating heart of Sirsi's welcome since 1998. Every room we
              prepare, every meal we serve, every event we host carries the weight of
              two decades of trust.
            </p>
            <p className="text-gray-500 leading-relaxed font-light">
              Strategically located in the city center, we are the gateway to Uttara
              Kannada's rich tapestry — ancient temples, cascading waterfalls, and the
              verdant embrace of the Western Ghats.
            </p>
            <div className="flex items-center gap-4 mt-10">
              <div className="h-px w-16 bg-yellow-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
              <div className="h-px w-8 bg-yellow-500/25" />
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[["100+", "Rooms"], ["150+", "Events"], ["5K+", "Guests"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl gold-text font-thin" style={{ fontFamily: "'Playfair Display',serif" }}>{n}</div>
                  <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(201,168,76,0.5)", textTransform: "uppercase" }} className="mt-1">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Philosophy quote ── */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-yellow-500/20 text-[100px] leading-none -mb-8 select-none"
            style={{ fontFamily: "'Playfair Display',serif" }}>"</div>
          <p className="text-3xl md:text-4xl text-gray-200 font-thin leading-relaxed"
            style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>
            We do not merely offer rooms. We offer a <span className="gold-text not-italic">sense of belonging</span> — to a place, to a people, to a tradition.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }} className="mb-4">
              Our Journey
            </div>
            <h2 className="text-5xl font-thin gold-text" style={{ fontFamily: "'Playfair Display',serif" }}>Milestones</h2>
          </motion.div>
          <div className="relative max-w-3xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500/40 via-yellow-500/20 to-transparent -translate-x-1/2" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className={`flex gap-8 mb-12 items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`flex-1 glass rounded-2xl p-6 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className="text-yellow-500/60 text-xs mb-2"
                    style={{ fontFamily: "'Cinzel',serif", fontSize: "0.55rem", letterSpacing: "0.2em" }}>{m.year}</div>
                  <div className="text-gray-300 text-sm font-light">{m.event}</div>
                </div>
                {/* dot */}
                <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0 shadow-[0_0_12px_rgba(201,168,76,0.6)] z-10" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Dining & Event Spaces ── */}
        <div>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }} className="mb-4">
              Spaces &amp; Experiences
            </div>
            <h2 className="text-5xl font-thin gold-text" style={{ fontFamily: "'Playfair Display',serif" }}>
              Dining &amp; Event Halls
            </h2>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px w-16 bg-yellow-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" /><div className="h-px w-8 bg-yellow-500/25" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue, i) => (
              <motion.div
                key={i}
                className="venue-card glass rounded-3xl overflow-hidden group cursor-default"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={venue.img}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={venue.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full border border-yellow-500/40 text-yellow-400"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(10px)",
                      fontFamily: "'Cinzel',serif",
                      fontSize: "0.52rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {venue.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-white font-light" style={{ fontFamily: "'Playfair Display',serif" }}>
                    {venue.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}