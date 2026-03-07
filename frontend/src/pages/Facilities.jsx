// import { Zap } from "lucide-react"
// import { motion } from "framer-motion"
// import Hero3D from "../components/Hero3D"

// const facilities = [

// {
// name: "Free WiFi",
// img: "https://hotelsupriyainternational.com/images/facilities/wifi.png"
// },

// {
// name: "Air Conditioned Rooms",
// img: "https://hotelsupriyainternational.com/images/facilities/ac.png"
// },

// {
// name: "Parking",
// img: "https://hotelsupriyainternational.com/images/facilities/car.png"
// },

// {
// name: "Restaurant",
// img: "https://hotelsupriyainternational.com/images/facilities/restaurant.png"
// },

// {
// name: "Room Service",
// img: "https://hotelsupriyainternational.com/images/facilities/roomservice.png"
// },

// {
// name: "Elevator",
// img: "https://hotelsupriyainternational.com/images/facilities/elevator.png"
// },

// {
// name: "Doctor on Call",
// img: "https://hotelsupriyainternational.com/images/facilities/doctor.png"
// },

// {
// name: "Meeting Hall",
// img: "https://hotelsupriyainternational.com/images/facilities/meeting.png"
// },

// {
// name: "Banquet Hall",
// img: "https://hotelsupriyainternational.com/images/facilities/banquet.jpg"
// },

// {
// name: "Secure Payment",
// img: "https://hotelsupriyainternational.com/images/facilities/securepay.png"
// },

// {
// name: "EV Charging Station",
// img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
// }

// ]

// export default function Facilities(){

// return(

// <div className="relative min-h-screen pt-32 px-6">

// <Hero3D/>

// <div className="max-w-[1400px] mx-auto">

// <h1 className="text-5xl text-gold font-bold text-center mb-16">
// Hotel Facilities
// </h1>

// <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

// {facilities.map((facility,index)=> (

// <motion.div
// key={index}
// whileHover={{scale:1.05}}
// className={`glass rounded-xl p-8 text-center transition
// ${facility.name === "EV Charging Station"
// ? "hover:shadow-[0_0_25px_rgba(34,197,94,0.8)]"
// : ""}
// `}
// >

// {/* <img
//   src={facility.img}
//   className="h-16 mx-auto mb-6 filter brightness-0 invert"
// /> */}
// {facility.name === "EV Charging Station" ? (

//   <Zap
//     size={48}
//     className="mx-auto mb-6 text-green-400"
//   />

// ) : (

//   <img
//     src={facility.img}
//     className="h-16 mx-auto mb-6 filter brightness-0 invert"
//   />

// )}
// <h3 className="text-lg">
// {facility.name}
// </h3>

// </motion.div>

// ))}

// </div>

// </div>

// </div>

// )

// }

import { motion } from "framer-motion"
import { Zap } from "lucide-react"

const facilities = [
  { name: "Free WiFi",            img: "https://hotelsupriyainternational.com/images/facilities/wifi.png",        desc: "High-speed throughout",   ev: false },
  { name: "Air Conditioned",      img: "https://hotelsupriyainternational.com/images/facilities/ac.png",          desc: "Climate-controlled rooms", ev: false },
  { name: "Parking",              img: "https://hotelsupriyainternational.com/images/facilities/car.png",         desc: "Secure valet service",    ev: false },
  { name: "Restaurant",           img: "https://hotelsupriyainternational.com/images/facilities/restaurant.png",  desc: "Multi-cuisine fine dining", ev: false },
  { name: "Room Service",         img: "https://hotelsupriyainternational.com/images/facilities/roomservice.png", desc: "24/7 in-room dining",     ev: false },
  { name: "Elevator",             img: "https://hotelsupriyainternational.com/images/facilities/elevator.png",    desc: "Smooth vertical transit", ev: false },
  { name: "Doctor on Call",       img: "https://hotelsupriyainternational.com/images/facilities/doctor.png",      desc: "Medical care on demand",  ev: false },
  { name: "Meeting Hall",         img: "https://hotelsupriyainternational.com/images/facilities/meeting.png",     desc: "Corporate-ready spaces",  ev: false },
  { name: "Banquet Hall",         img: "https://hotelsupriyainternational.com/images/facilities/banquet.jpg",     desc: "Celebrate life's moments", ev: false },
  { name: "Secure Payment",       img: "https://hotelsupriyainternational.com/images/facilities/securepay.png",   desc: "Multiple payment modes",  ev: false },
  { name: "EV Charging Station",  img: null,                                                                      desc: "Future-ready green tech", ev: true  },
]

export default function Facilities() {
  return (
    <div
      className="relative min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', serif", background: "#060606" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Cormorant+Garamond:wght@300;400;500&family=Cinzel:wght@400;700&display=swap');
        .gold-text{background:linear-gradient(135deg,#C9A84C 0%,#F0D080 40%,#C9A84C 60%,#8B6914 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .glass{background:linear-gradient(135deg,rgba(201,168,76,0.05),rgba(0,0,0,0.45));backdrop-filter:blur(18px);border:1px solid rgba(201,168,76,0.18);}
        .fac-card {
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          cursor: default;
        }
        .fac-card:hover {
          transform: translateY(-10px) scale(1.03);
          border-color: rgba(201,168,76,0.45) !important;
          box-shadow: 0 30px 80px rgba(201,168,76,0.12);
        }
        .fac-card.ev-card:hover {
          border-color: rgba(34,197,94,0.5) !important;
          box-shadow: 0 30px 80px rgba(34,197,94,0.18);
        }
        .fac-icon {
          filter: brightness(0) invert(1);
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .fac-card:hover .fac-icon { opacity: 1; }
      `}</style>

      {/* ── Page Hero ── */}
      <div className="relative pt-32 pb-20 overflow-hidden">
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
            Hotel Supriya International
          </div>
          <h1 className="text-6xl md:text-8xl font-thin gold-text" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300 }}>
            Facilities
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-16 bg-yellow-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" /><div className="h-px w-8 bg-yellow-500/25" />
          </div>
          <p className="text-gray-400 mt-4 text-lg font-light">Everything you need, nothing you don't</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32">

        {/* ── Facilities Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {facilities.map((f, i) => (
            <motion.div
              key={i}
              className={`fac-card glass rounded-2xl p-8 text-center flex flex-col items-center gap-4 ${f.ev ? "ev-card" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              {/* Icon */}
              <div className="h-14 flex items-center justify-center">
                {f.ev ? (
                  <Zap size={44} className="text-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]" />
                ) : (
                  <img
                    src={f.img}
                    alt={f.name}
                    className="fac-icon h-12 w-12 object-contain"
                  />
                )}
              </div>

              {/* Name */}
              <h3
                className="text-white text-sm font-light leading-tight"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                {f.name}
              </h3>

              {/* Desc */}
              <p className="text-gray-600 text-xs leading-relaxed"
                style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem", letterSpacing: "0.1em" }}>
                {f.desc}
              </p>

              {/* Bottom accent line */}
              <div className={`h-px w-8 mt-1 ${f.ev ? "bg-green-400/40" : "bg-yellow-500/30"}`} />
            </motion.div>
          ))}
        </div>

        {/* ── CTA banner ── */}
        <motion.div
          className="mt-24 glass rounded-[40px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* shimmer */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.06),transparent)", backgroundSize: "200% 100%", animation: "shimmer 4s infinite" }} />
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.55rem", letterSpacing: "0.4em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase" }} className="mb-3">
              All Inclusive
            </div>
            <h3 className="text-4xl font-thin text-white" style={{ fontFamily: "'Playfair Display',serif" }}>
              Every facility.<br />
              <span className="gold-text">Every comfort.</span>
            </h3>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-end flex-shrink-0">
            <p className="text-gray-400 text-sm text-center md:text-right max-w-xs font-light">
              Our amenities are designed to complement every stay, whether business or leisure.
            </p>
            <button
              className="px-10 py-3 rounded-sm border border-yellow-500/40 text-yellow-400
                hover:bg-yellow-500/10 hover:border-yellow-400 transition-all duration-300 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel',serif", fontSize: "0.6rem" }}
            >
              Book a Room
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}