import { useRef, useState } from "react"
import { motion } from "framer-motion"

function CarouselCard({ item }) {
  const [hovered, setHovered] = useState(false)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rx = ((e.clientY - rect.top  - rect.height / 2) / rect.height) * -12
    const ry = ((e.clientX - rect.left - rect.width  / 2) / rect.width)  *  12
    setRot({ x: rx, y: ry })
  }

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-72 rounded-3xl overflow-hidden cursor-default"
      style={{
        border: "1px solid rgba(201,168,76,0.2)",
        background: "linear-gradient(135deg, rgba(201,168,76,0.05), rgba(0,0,0,0.5))",
        backdropFilter: "blur(12px)",
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setRot({ x: 0, y: 0 }) }}
      onMouseMove={handleMove}
      animate={{
        rotateX: rot.x,
        rotateY: rot.y,
        boxShadow: hovered ? "0 24px 60px rgba(201,168,76,0.18)" : "0 0px 0px rgba(201,168,76,0)",
        borderColor: hovered ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.2)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      <div className="relative overflow-hidden h-52">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${item.img})` }}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
          animate={{ opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-5">
        <div
          className="text-yellow-500/70 uppercase mb-2"
          style={{ fontFamily: "'Cinzel', serif", fontSize: "0.52rem", letterSpacing: "0.3em" }}
        >
          {item.tag}
        </div>
        <div className="text-white text-base font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
          {item.title}
        </div>
        <div className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</div>
      </div>
    </motion.div>
  )
}

export function GalleryCarousel({ items }) {
  const [paused, setPaused] = useState(false)
  const doubled = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee 32s linear infinite;
        }
        .marquee-track.paused { animation-play-state: paused; }
      `}</style>

      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #060606, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #060606, transparent)" }} />

      <div className={`marquee-track ${paused ? "paused" : ""}`}>
        {doubled.map((item, i) => (
          <CarouselCard key={i} item={item} />
        ))}
      </div>
    </div>
  )
}