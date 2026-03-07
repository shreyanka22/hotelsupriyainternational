// import { motion } from "framer-motion"
// import Hero3D from "../components/Hero3D"

// const places = [

// {
// name: "Sahasralinga",
// img: "https://hotelsupriyainternational.com/images/tourism/1.jpg",
// distance: "18 km",
// category: "Nature",
// map: "https://maps.google.com/?q=Sahasralinga"
// },

// {
// name: "Unchalli Falls",
// img: "https://hotelsupriyainternational.com/images/tourism/2.jpg",
// distance: "35 km",
// category: "Waterfall",
// map: "https://maps.google.com/?q=Unchalli+Falls"
// },

// {
// name: "Shri Marikamba Devi Temple",
// img: "https://hotelsupriyainternational.com/images/tourism/3.jpg",
// distance: "2 km",
// category: "Temple",
// map: "https://maps.google.com/?q=Marikamba+Temple+Sirsi"
// },

// {
// name: "Banavasi",
// img: "https://hotelsupriyainternational.com/images/tourism/4.jpeg",
// distance: "22 km",
// category: "Historic Town",
// map: "https://maps.google.com/?q=Banavasi"
// },

// {
// name: "Yana",
// img: "https://hotelsupriyainternational.com/images/tourism/5.jpg",
// distance: "55 km",
// category: "Nature",
// map: "https://maps.google.com/?q=Yana+Karnataka"
// },

// {
// name: "Shree Swarnavalli Mutt",
// img: "https://hotelsupriyainternational.com/images/tourism/6.jpg",
// distance: "8 km",
// category: "Temple",
// map: "https://maps.google.com/?q=Swarnavalli+Mutt"
// },

// {
// name: "Gudavi Bird Sanctuary",
// img: "https://hotelsupriyainternational.com/images/tourism/7.jpg",
// distance: "50 km",
// category: "Nature",
// map: "https://maps.google.com/?q=Gudavi+Bird+Sanctuary"
// },

// {
// name: "Shri Venkataramana Temple",
// img: "https://hotelsupriyainternational.com/images/tourism/8.jpg",
// distance: "3 km",
// category: "Temple",
// map: "https://maps.google.com/?q=Venkataramana+Temple+Sirsi"
// },

// {
// name: "Muregar Falls",
// img: "https://hotelsupriyainternational.com/images/tourism/9.jpg",
// distance: "40 km",
// category: "Waterfall",
// map: "https://maps.google.com/?q=Muregar+Falls"
// },

// {
// name: "Shivaganga Falls",
// img: "https://hotelsupriyainternational.com/images/tourism/10.jpg",
// distance: "28 km",
// category: "Waterfall",
// map: "https://maps.google.com/?q=Shivaganga+Falls"
// }

// ]

// export default function Tourism(){

// return(

// <div className="relative min-h-screen pt-32 px-6">

// <Hero3D/>

// <div className="max-w-[1400px] mx-auto">

// <h1 className="text-5xl text-gold font-bold text-center mb-16">
// Nearby Tourism
// </h1>

// <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

// {places.map((place,index)=> (

// <motion.div
// key={index}
// whileHover={{scale:1.04}}
// className="relative overflow-hidden rounded-xl glass"
// >

// <img
// src={place.img}
// className="w-full h-80 object-cover transition duration-500 hover:scale-110"
// />

// <div className="absolute bottom-0 w-full bg-black/70 p-5 space-y-1">

// <h3 className="text-lg text-white font-semibold">
// {place.name}
// </h3>

// <p className="text-sm text-gray-300">
// {place.category} • {place.distance} from hotel
// </p>

// <a
// href={place.map}
// target="_blank"
// className="inline-block mt-2 text-sm text-gold hover:underline"
// >
// View on Map
// </a>

// </div>

// </motion.div>

// ))}

// </div>

// </div>

// </div>

// )

// }

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const places = [
  { name: "Sahasralinga",              img: "https://hotelsupriyainternational.com/images/tourism/1.jpg",  distance: "18 km",  category: "Nature",    map: "https://maps.google.com/?q=Sahasralinga",              desc: "Thousands of Shivalingas carved on the banks of the Shalmala river." },
  { name: "Unchalli Falls",            img: "https://hotelsupriyainternational.com/images/tourism/2.jpg",  distance: "35 km",  category: "Waterfall", map: "https://maps.google.com/?q=Unchalli+Falls",            desc: "A breathtaking 116m waterfall cascading into a forested gorge." },
  { name: "Shri Marikamba Devi Temple",img: "https://hotelsupriyainternational.com/images/tourism/3.jpg",  distance: "2 km",   category: "Temple",    map: "https://maps.google.com/?q=Marikamba+Temple+Sirsi",    desc: "The revered patron goddess of Sirsi, celebrated with grandeur." },
  { name: "Banavasi",                  img: "https://hotelsupriyainternational.com/images/tourism/4.jpeg", distance: "22 km",  category: "Heritage",  map: "https://maps.google.com/?q=Banavasi",                  desc: "One of the oldest towns in Karnataka, steeped in Kadamba history." },
  { name: "Yana",                      img: "https://hotelsupriyainternational.com/images/tourism/5.jpg",  distance: "55 km",  category: "Nature",    map: "https://maps.google.com/?q=Yana+Karnataka",            desc: "Dramatic black crystalline rock formations rising from dense forest." },
  { name: "Shree Swarnavalli Mutt",    img: "https://hotelsupriyainternational.com/images/tourism/6.jpg",  distance: "8 km",   category: "Temple",    map: "https://maps.google.com/?q=Swarnavalli+Mutt",          desc: "A serene spiritual retreat on the banks of the Shalmala river." },
  { name: "Gudavi Bird Sanctuary",     img: "https://hotelsupriyainternational.com/images/tourism/7.jpg",  distance: "50 km",  category: "Nature",    map: "https://maps.google.com/?q=Gudavi+Bird+Sanctuary",     desc: "A haven for migratory birds and nature enthusiasts alike." },
  { name: "Shri Venkataramana Temple", img: "https://hotelsupriyainternational.com/images/tourism/8.jpg",  distance: "3 km",   category: "Temple",    map: "https://maps.google.com/?q=Venkataramana+Temple+Sirsi", desc: "An ancient Dravidian temple of great religious significance." },
  { name: "Muregar Falls",             img: "https://hotelsupriyainternational.com/images/tourism/9.jpg",  distance: "40 km",  category: "Waterfall", map: "https://maps.google.com/?q=Muregar+Falls",             desc: "A secluded cascade surrounded by lush Western Ghats vegetation." },
  { name: "Shivaganga Falls",          img: "https://hotelsupriyainternational.com/images/tourism/10.jpg", distance: "28 km",  category: "Waterfall", map: "https://maps.google.com/?q=Shivaganga+Falls",          desc: "Sacred waters flowing through ancient rock formations." },
]

const categories = ["All", "Nature", "Waterfall", "Temple", "Heritage"]

const categoryColors = {
  Nature:   "#4ade80",
  Waterfall:"#60a5fa",
  Temple:   "#C9A84C",
  Heritage: "#f472b6",
}

export default function Tourism() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? places : places.filter((p) => p.category === filter)

  return (
    <div
      className="relative min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', serif", background: "#060606" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Cormorant+Garamond:wght@300;400;500&family=Cinzel:wght@400;700&display=swap');
        .gold-text{background:linear-gradient(135deg,#C9A84C 0%,#F0D080 40%,#C9A84C 60%,#8B6914 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .glass{background:linear-gradient(135deg,rgba(201,168,76,0.05),rgba(0,0,0,0.45));backdrop-filter:blur(18px);border:1px solid rgba(201,168,76,0.18);}
        .filter-btn{font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;transition:all 0.3s;border:1px solid rgba(201,168,76,0.2);color:rgba(255,255,255,0.45);}
        .filter-btn:hover{border-color:rgba(201,168,76,0.5);color:#C9A84C;}
        .filter-btn.active{background:linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.05));border-color:rgba(201,168,76,0.5);color:#C9A84C;}
        .place-card { transition: all 0.5s cubic-bezier(0.16,1,0.3,1); }
        .place-card:hover { transform: translateY(-10px); }
        .place-card:hover .card-image { transform: scale(1.08); }
        .card-image { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .map-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Cinzel',serif; font-size: 0.55rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(201,168,76,0.7);
          transition: color 0.3s;
        }
        .map-link:hover { color: #C9A84C; }
        .map-link::after {
          content: '→';
          transition: transform 0.3s;
        }
        .map-link:hover::after { transform: translateX(4px); }
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
            Discover Sirsi
          </div>
          <h1 className="text-6xl md:text-8xl font-thin gold-text" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300 }}>
            Nearby<br />Attractions
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-16 bg-yellow-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" /><div className="h-px w-8 bg-yellow-500/25" />
          </div>
          <p className="text-gray-400 mt-4 text-lg font-light">
            Explore the wonders of Uttara Kannada from your doorstep
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32">

        {/* ── Filter Tabs ── */}
        <div className="flex justify-center gap-3 flex-wrap mb-16">
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

        {/* ── Cards Grid ── */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((place, i) => (
              <motion.div
                key={place.name}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <div className="place-card glass rounded-3xl overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden h-72">
                    <img
                      src={place.img}
                      alt={place.name}
                      className="card-image w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Distance badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs"
                      style={{
                        background: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${categoryColors[place.category]}40`,
                        color: categoryColors[place.category],
                        fontFamily: "'Cinzel',serif",
                        fontSize: "0.52rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      }}
                    >
                      {place.category}
                    </div>

                    {/* Distance */}
                    <div className="absolute top-4 right-4 text-right">
                      <div className="text-white text-xs" style={{ fontFamily: "'Cinzel',serif", fontSize: "0.55rem", letterSpacing: "0.2em" }}>
                        {place.distance}
                      </div>
                      <div className="text-gray-400 text-xs" style={{ fontSize: "0.48rem", letterSpacing: "0.1em" }}>from hotel</div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-2xl text-white font-light mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
                      {place.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{place.desc}</p>
                    <a href={place.map} target="_blank" rel="noreferrer" className="map-link">
                      View on Map
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Legend ── */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                {cat}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}