// import { motion } from "framer-motion"
// import Hero3D from "../components/Hero3D"
// import { useState } from "react"

// const images = [

// "https://hotelsupriyainternational.com/images/gallery/1.jpg",
// "https://hotelsupriyainternational.com/images/gallery/2.jpg",
// "https://hotelsupriyainternational.com/images/gallery/3.jpg",
// "https://hotelsupriyainternational.com/images/gallery/4.jpg",
// "https://hotelsupriyainternational.com/images/gallery/5.jpg",
// "https://hotelsupriyainternational.com/images/gallery/6.jpg",
// "https://hotelsupriyainternational.com/images/gallery/7.jpg",
// "https://hotelsupriyainternational.com/images/gallery/8.jpg",
// "https://hotelsupriyainternational.com/images/gallery/9.jpg",
// "https://hotelsupriyainternational.com/images/gallery/10.jpg",
// "https://hotelsupriyainternational.com/images/gallery/11.jpg",
// "https://hotelsupriyainternational.com/images/gallery/12.jpg",
// "https://hotelsupriyainternational.com/images/gallery/13.jpg",
// "https://hotelsupriyainternational.com/images/gallery/14.jpg",
// "https://hotelsupriyainternational.com/images/gallery/15.jpg",
// "https://hotelsupriyainternational.com/images/gallery/16.jpg",
// "https://hotelsupriyainternational.com/images/gallery/17.jpg",
// "https://hotelsupriyainternational.com/images/gallery/18.jpg",
// "https://hotelsupriyainternational.com/images/gallery/19.jpg",
// "https://hotelsupriyainternational.com/images/gallery/20.jpg",

// ]

// export default function Gallery() {

//   const [selectedImage, setSelectedImage] = useState(null)

//   return (

//     <div className="relative min-h-screen pt-32 px-8">

//       {/* 3D background */}
//       <Hero3D />

//       <div className="max-w-[1400px] mx-auto">

//         <h1 className="text-5xl font-bold text-gold text-center mb-20">
//           Gallery
//         </h1>

//         {/* Gallery Grid */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {images.map((img, index) => (

//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.03 }}
//               className="overflow-hidden rounded-xl glass cursor-pointer"
//               onClick={() => setSelectedImage(img)}
//             >

//               <img
//                 src={img}
//                 className="w-full h-[320px] object-cover transition duration-500 hover:scale-110"
//               />

//             </motion.div>

//           ))}

//         </div>

//       </div>


//       {/* Image Modal */}

//       {selectedImage && (

//         <div
//           className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >

//           <img
//             src={selectedImage}
//             className="max-w-[90%] max-h-[85%] rounded-lg"
//           />

//         </div>

//       )}

//     </div>

//   )
// }

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const images = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `https://hotelsupriyainternational.com/images/gallery/${i + 1}.jpg`,
  // alternate tall/wide for masonry feel
  tall: [1, 4, 7, 11, 15, 18].includes(i + 1),
}))

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const [idx, setIdx]           = useState(null)

  const open  = (i) => { setIdx(i); setSelected(images[i]) }
  const close = ()  => { setSelected(null); setIdx(null) }
  const prev  = (e) => { e.stopPropagation(); const ni = (idx - 1 + images.length) % images.length; open(ni) }
  const next  = (e) => { e.stopPropagation(); const ni = (idx + 1) % images.length; open(ni) }

  return (
    <div
      className="relative min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', serif", background: "#060606" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Cormorant+Garamond:wght@300;400;500&family=Cinzel:wght@400;700&display=swap');
        .gold-text{background:linear-gradient(135deg,#C9A84C 0%,#F0D080 40%,#C9A84C 60%,#8B6914 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .glass{background:linear-gradient(135deg,rgba(201,168,76,0.05),rgba(0,0,0,0.45));backdrop-filter:blur(18px);border:1px solid rgba(201,168,76,0.18);}
        .gallery-item {
          overflow: hidden;
          border-radius: 1.25rem;
          cursor: pointer;
          border: 1px solid rgba(201,168,76,0.1);
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .gallery-item:hover {
          border-color: rgba(201,168,76,0.4);
          box-shadow: 0 20px 60px rgba(201,168,76,0.12);
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .gallery-item:hover img { transform: scale(1.08); }
        .gallery-item .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
          opacity: 0;
          transition: opacity 0.4s;
          display: flex;
          align-items: flex-end;
          padding: 1.25rem;
        }
        .gallery-item:hover .overlay { opacity: 1; }
        .masonry {
          columns: 2;
          column-gap: 1.25rem;
        }
        @media (min-width: 768px) { .masonry { columns: 3; } }
        @media (min-width: 1024px) { .masonry { columns: 4; } }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1.25rem;
        }
        .nav-arrow {
          width: 48px; height: 48px; border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.4);
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          color: #C9A84C;
          font-size: 1.2rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s;
        }
        .nav-arrow:hover { background: rgba(201,168,76,0.15); border-color: rgba(201,168,76,0.8); }
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
            Gallery
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-16 bg-yellow-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" /><div className="h-px w-8 bg-yellow-500/25" />
          </div>
          <p className="text-gray-400 mt-4 text-lg font-light">A visual journey through luxury</p>
        </motion.div>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="masonry">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className="masonry-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 8) * 0.06, duration: 0.6 }}
            >
              <div
                className="gallery-item relative"
                style={{ height: img.tall ? "380px" : "260px" }}
                onClick={() => open(i)}
              >
                <img src={img.src} alt={`Gallery ${img.id}`} loading="lazy" />
                <div className="overlay">
                  <div
                    className="text-yellow-500/70 text-xs"
                    style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
                  >
                    View Full
                  </div>
                </div>
                {/* corner accent */}
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-yellow-500/30 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-yellow-500/30 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-8 text-yellow-500/60 hover:text-yellow-400 transition-colors text-3xl z-50"
              onClick={close}
              style={{ fontFamily: "'Cinzel',serif" }}
            >
              ×
            </button>

            {/* Counter */}
            <div
              className="absolute top-6 left-1/2 -translate-x-1/2 text-yellow-500/50"
              style={{ fontFamily: "'Cinzel',serif", fontSize: "0.55rem", letterSpacing: "0.3em" }}
            >
              {idx + 1} / {images.length}
            </div>

            {/* Prev */}
            <button className="nav-arrow absolute left-6 z-50" onClick={prev}>‹</button>

            {/* Image */}
            <motion.div
              key={selected.id}
              className="relative"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative corners */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-yellow-500/50 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r border-yellow-500/50 pointer-events-none" />
              <img
                src={selected.src}
                className="max-w-[88vw] max-h-[82vh] rounded-xl object-contain"
                style={{ boxShadow: "0 0 100px rgba(201,168,76,0.1)" }}
                alt="Gallery"
              />
            </motion.div>

            {/* Next */}
            <button className="nav-arrow absolute right-6 z-50" onClick={next}>›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}