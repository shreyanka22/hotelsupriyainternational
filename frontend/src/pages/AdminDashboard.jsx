// import { useEffect, useState, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// const API = "http://localhost:5001/api"

// /* ── tiny fetch helper ── */
// const api = (path, opts = {}) =>
//   fetch(`${API}${path}`, { credentials: "include", ...opts }).then((r) => r.json())

// /* ── sparkline SVG ── */
// function Sparkline({ data = [], color = "#C9A84C" }) {
//   if (!data.length) return null
//   const max = Math.max(...data.map((d) => d.count), 1)
//   const w = 120, h = 40
//   const pts = data.map((d, i) => {
//     const x = (i / (data.length - 1)) * w
//     const y = h - (d.count / max) * h
//     return `${x},${y}`
//   }).join(" ")
//   return (
//     <svg width={w} height={h} className="opacity-60">
//       <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
//       {data.map((d, i) => (
//         <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - (d.count / max) * h} r="3" fill={color} />
//       ))}
//     </svg>
//   )
// }

// /* ── status badge ── */
// function StatusBadge({ status }) {
//   const map = {
//     new:       { label: "New",       bg: "rgba(201,168,76,0.15)",  color: "#C9A84C",  dot: "#C9A84C"  },
//     contacted: { label: "Contacted", bg: "rgba(99,179,237,0.15)",  color: "#63B3ED",  dot: "#63B3ED"  },
//     resolved:  { label: "Resolved",  bg: "rgba(104,211,145,0.15)", color: "#68D391",  dot: "#68D391"  },
//   }
//   const s = map[status] || map.new
//   return (
//     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
//       style={{ background: s.bg, color: s.color, fontFamily: "'Cinzel', serif", letterSpacing: "0.1em" }}>
//       <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
//       {s.label}
//     </span>
//   )
// }

// /* ── star rating ── */
// function Stars({ rating }) {
//   return (
//     <span className="flex gap-0.5">
//       {[1,2,3,4,5].map((s) => (
//         <span key={s} style={{ color: s <= rating ? "#C9A84C" : "rgba(201,168,76,0.2)", fontSize: "14px" }}>★</span>
//       ))}
//     </span>
//   )
// }

// /* ── modal wrapper ── */
// function Modal({ open, onClose, title, children }) {
//   if (!open) return null
//   return (
//     <AnimatePresence>
//       <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
//         <motion.div className="relative w-full max-w-lg rounded-2xl p-8 z-10"
//           style={{ background: "#0e0e0e", border: "1px solid rgba(201,168,76,0.2)" }}
//           initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}>
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="gold-text text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
//             <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-2xl leading-none">×</button>
//           </div>
//           {children}
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   )
// }

// /* ════════════════════════════════════════════ */
// export default function AdminDashboard() {
//   const [user,       setUser]       = useState(null)
//   const [loading,    setLoading]    = useState(true)
//   const [tab,        setTab]        = useState("overview")
//   const [stats,      setStats]      = useState(null)
//   const [enquiries,  setEnquiries]  = useState([])
//   const [reviews,    setReviews]    = useState([])
//   const [statusFilter, setStatusFilter] = useState("")
//   const [toast,      setToast]      = useState(null)

//   /* review form */
//   const [reviewModal, setReviewModal] = useState(false)
//   const [editReview,  setEditReview]  = useState(null)
//   const [reviewForm,  setReviewForm]  = useState({ guestName: "", rating: 5, comment: "", roomType: "", featured: false })

//   /* enquiry detail */
//   const [enquiryDetail, setEnquiryDetail] = useState(null)

//   /* ── Toast helper ── */
//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type })
//     setTimeout(() => setToast(null), 3000)
//   }

//   /* ── Auth check ── */
//   useEffect(() => {
//     api("/auth/me").then((data) => {
//       if (data.loggedIn) setUser(data.user)
//       setLoading(false)
//     })
//   }, [])

//   /* ── Load data when logged in ── */
//   useEffect(() => {
//     if (!user) return
//     loadStats()
//     loadEnquiries()
//     loadReviews()
//   }, [user])

//   useEffect(() => {
//     if (!user) return
//     loadEnquiries()
//   }, [statusFilter])

//   const loadStats     = () => api("/enquiries/stats").then(setStats)
//   const loadReviews   = () => api("/reviews/all").then(setReviews)
//   const loadEnquiries = () =>
//     api(`/enquiries${statusFilter ? `?status=${statusFilter}` : ""}`).then((d) => setEnquiries(d.items || []))

//   /* ── Enquiry actions ── */
//   const updateStatus = async (id, status) => {
//     await api(`/enquiries/${id}/status`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     })
//     loadEnquiries(); loadStats()
//     showToast("Status updated")
//   }

//   const deleteEnquiry = async (id) => {
//     if (!confirm("Delete this enquiry?")) return
//     await api(`/enquiries/${id}`, { method: "DELETE" })
//     loadEnquiries(); loadStats()
//     showToast("Enquiry deleted", "error")
//   }

//   /* ── Review actions ── */
//   const openAddReview  = () => { setEditReview(null); setReviewForm({ guestName: "", rating: 5, comment: "", roomType: "", featured: false }); setReviewModal(true) }
//   const openEditReview = (r) => { setEditReview(r); setReviewForm({ guestName: r.guestName, rating: r.rating, comment: r.comment, roomType: r.roomType || "", featured: r.featured }); setReviewModal(true) }

//   const saveReview = async () => {
//     const method = editReview ? "PUT" : "POST"
//     const path   = editReview ? `/reviews/${editReview._id}` : "/reviews"
//     await api(path, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(reviewForm) })
//     setReviewModal(false); loadReviews()
//     showToast(editReview ? "Review updated" : "Review added")
//   }

//   const toggleFeatured = async (id) => {
//     await api(`/reviews/${id}/featured`, { method: "PATCH" })
//     loadReviews()
//     showToast("Featured status toggled")
//   }

//   const deleteReview = async (id) => {
//     if (!confirm("Delete this review?")) return
//     await api(`/reviews/${id}`, { method: "DELETE" })
//     loadReviews()
//     showToast("Review deleted", "error")
//   }

//   const logout = async () => {
//     await api("/auth/logout", { method: "POST" })
//     setUser(null)
//   }

//   /* ══════════════════════════════════════
//      LOGIN SCREEN
//   ══════════════════════════════════════ */
//   if (loading) return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <motion.div className="w-8 h-8 rounded-full border-2 border-yellow-500/30 border-t-yellow-500"
//         animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
//     </div>
//   )

//   if (!user) return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
//       style={{ background: "#060606" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&family=Cinzel:wght@400;700&display=swap');
//         .gold-text{background:linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
//       `}</style>

//       {/* Animated background rings */}
//       {[400,280,160].map((size, i) => (
//         <motion.div key={i} className="absolute rounded-full pointer-events-none"
//           style={{ width: size, height: size, border: "1px solid rgba(201,168,76,0.08)" }}
//           animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
//           transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }} />
//       ))}

//       <motion.div className="relative z-10 text-center px-8"
//         initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}>
//         <img src="/supriyalogo.png" alt="Supriya" className="mx-auto mb-8"
//           style={{ height: "80px", filter: "drop-shadow(0 0 20px rgba(201,168,76,0.5))" }} />
//         <h1 className="gold-text text-4xl md:text-5xl font-thin mb-2"
//           style={{ fontFamily: "'Playfair Display', serif" }}>Admin Portal</h1>
//         <p className="text-gray-500 mb-12 tracking-widest uppercase text-xs"
//           style={{ fontFamily: "'Cinzel', serif" }}>Hotel Supriya International</p>

//         <motion.a href="http://localhost:5001/api/auth/google"
//           className="inline-flex items-center gap-4 px-10 py-4 rounded-sm transition-all duration-300"
//           style={{ background: "linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C)", color: "black" }}
//           whileHover={{ scale: 1.04, boxShadow: "0 20px 60px rgba(201,168,76,0.35)" }}
//           whileTap={{ scale: 0.98 }}>
//           <svg width="20" height="20" viewBox="0 0 24 24">
//             <path fill="#333" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//             <path fill="#333" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//             <path fill="#333" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//             <path fill="#333" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//           </svg>
//           <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.2em", fontWeight: 700 }}>
//             SIGN IN WITH GOOGLE
//           </span>
//         </motion.a>

//         <p className="text-gray-700 text-xs mt-8" style={{ fontFamily: "'Cinzel', serif" }}>
//           Access restricted to authorised personnel only
//         </p>
//       </motion.div>
//     </div>
//   )

//   /* ══════════════════════════════════════
//      DASHBOARD
//   ══════════════════════════════════════ */
//   const tabs = ["overview", "enquiries", "reviews"]

//   return (
//     <div className="min-h-screen" style={{ background: "#060606", fontFamily: "'Cormorant Garamond', serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700&family=Cormorant+Garamond:wght@300;400;500&family=Cinzel:wght@400;700&display=swap');
//         .gold-text{background:linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
//         .glass{background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.12);backdrop-filter:blur(10px);}
//         .stat-card{background:linear-gradient(135deg,rgba(201,168,76,0.06),rgba(0,0,0,0.4));border:1px solid rgba(201,168,76,0.15);transition:all 0.3s;}
//         .stat-card:hover{border-color:rgba(201,168,76,0.35);transform:translateY(-4px);}
//         .tab-btn{font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.25em;text-transform:uppercase;transition:all 0.3s;padding:10px 24px;border-bottom:2px solid transparent;}
//         .tab-btn.active{color:#C9A84C;border-bottom-color:#C9A84C;}
//         .tab-btn:not(.active){color:rgba(255,255,255,0.35);}
//         .tab-btn:not(.active):hover{color:rgba(255,255,255,0.7);}
//         .data-row:hover{background:rgba(201,168,76,0.04);}
//         .input-gold{background:rgba(255,255,255,0.04);border:1px solid rgba(201,168,76,0.2);border-radius:8px;color:white;padding:10px 14px;width:100%;transition:border 0.3s;outline:none;font-family:'Cormorant Garamond',serif;font-size:1rem;}
//         .input-gold:focus{border-color:rgba(201,168,76,0.6);}
//         .btn-gold{background:linear-gradient(135deg,#C9A84C,#F0D080);color:black;font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.18em;font-weight:700;padding:10px 24px;border-radius:6px;transition:all 0.3s;}
//         .btn-gold:hover{transform:translateY(-1px);box-shadow:0 10px 30px rgba(201,168,76,0.3);}
//         .btn-ghost{background:transparent;border:1px solid rgba(201,168,76,0.25);color:rgba(201,168,76,0.7);font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.15em;padding:8px 20px;border-radius:6px;transition:all 0.3s;}
//         .btn-ghost:hover{border-color:rgba(201,168,76,0.6);color:#C9A84C;}
//         .btn-danger{background:transparent;border:1px solid rgba(252,129,129,0.25);color:rgba(252,129,129,0.7);font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.12em;padding:8px 16px;border-radius:6px;transition:all 0.3s;}
//         .btn-danger:hover{border-color:rgba(252,129,129,0.6);color:#FC8181;}
//         ::-webkit-scrollbar{width:4px;height:4px;}
//         ::-webkit-scrollbar-track{background:transparent;}
//         ::-webkit-scrollbar-thumb{background:#8B6914;border-radius:2px;}
//         select option{background:#111;}
//       `}</style>

//       {/* ── TOAST ── */}
//       <AnimatePresence>
//         {toast && (
//           <motion.div className="fixed top-6 right-6 z-50 px-6 py-3 rounded-xl text-sm"
//             style={{
//               background: toast.type === "error" ? "rgba(252,129,129,0.15)" : "rgba(104,211,145,0.15)",
//               border: `1px solid ${toast.type === "error" ? "rgba(252,129,129,0.3)" : "rgba(104,211,145,0.3)"}`,
//               color: toast.type === "error" ? "#FC8181" : "#68D391",
//               backdropFilter: "blur(10px)",
//             }}
//             initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
//             exit={{ x: 60, opacity: 0 }}>
//             {toast.msg}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── SIDEBAR ── */}
//       <div className="flex min-h-screen">
//         <aside className="w-64 flex-shrink-0 glass flex flex-col"
//           style={{ borderRight: "1px solid rgba(201,168,76,0.1)", borderTop: "none", borderBottom: "none", borderLeft: "none" }}>
//           {/* Logo */}
//           <div className="p-8 border-b" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
//             <div className="flex items-center gap-3">
//               <img src="/supriyalogo.png" alt="Supriya"
//                 style={{ height: "40px", filter: "drop-shadow(0 0 8px rgba(201,168,76,0.4))" }} />
//               <div>
//                 <div className="gold-text text-sm font-bold" style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.1em" }}>Supriya</div>
//                 <div className="text-gray-600 text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.45rem" }}>Admin Portal</div>
//               </div>
//             </div>
//           </div>

//           {/* Nav */}
//           <nav className="flex-1 p-6 flex flex-col gap-2">
//             {[
//               { id: "overview",  icon: "◈", label: "Overview"  },
//               { id: "enquiries", icon: "◉", label: "Enquiries" },
//               { id: "reviews",   icon: "◆", label: "Reviews"   },
//             ].map((item) => (
//               <button key={item.id} onClick={() => setTab(item.id)}
//                 className="flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300"
//                 style={{
//                   background: tab === item.id ? "rgba(201,168,76,0.1)" : "transparent",
//                   border: `1px solid ${tab === item.id ? "rgba(201,168,76,0.25)" : "transparent"}`,
//                   color: tab === item.id ? "#C9A84C" : "rgba(255,255,255,0.35)",
//                   fontFamily: "'Cinzel', serif",
//                   fontSize: "0.62rem",
//                   letterSpacing: "0.2em",
//                 }}>
//                 <span style={{ fontSize: "0.8rem" }}>{item.icon}</span>
//                 {item.label}
//                 {item.id === "enquiries" && stats?.newCount > 0 && (
//                   <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
//                     style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C", fontSize: "0.6rem" }}>
//                     {stats.newCount}
//                   </span>
//                 )}
//               </button>
//             ))}
//           </nav>

//           {/* User */}
//           <div className="p-6 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
//             <div className="flex items-center gap-3 mb-4">
//               {user.avatar
//                 ? <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
//                 : <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
//                     style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C" }}>
//                     {user.name?.[0]}
//                   </div>
//               }
//               <div className="overflow-hidden">
//                 <div className="text-white text-sm truncate">{user.name}</div>
//                 <div className="text-gray-600 text-xs truncate">{user.email}</div>
//               </div>
//             </div>
//             <button onClick={logout} className="btn-ghost w-full text-center">Sign Out</button>
//           </div>
//         </aside>

//         {/* ── MAIN ── */}
//         <main className="flex-1 overflow-auto">

//           {/* ══ OVERVIEW ══ */}
//           {tab === "overview" && (
//             <motion.div className="p-8 md:p-12"
//               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//               <div className="mb-10">
//                 <div className="text-yellow-500/50 tracking-widest uppercase mb-2 text-xs" style={{ fontFamily: "'Cinzel', serif" }}>Dashboard</div>
//                 <h1 className="gold-text text-4xl md:text-5xl font-thin" style={{ fontFamily: "'Playfair Display', serif" }}>Overview</h1>
//               </div>

//               {/* Stat cards */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
//                 {[
//                   { label: "Total Enquiries", value: stats?.total     ?? "—", sub: "All time"     },
//                   { label: "New",             value: stats?.newCount  ?? "—", sub: "Needs action" },
//                   { label: "Contacted",       value: stats?.contacted ?? "—", sub: "In progress"  },
//                   { label: "Resolved",        value: stats?.resolved  ?? "—", sub: "Completed"    },
//                 ].map((s, i) => (
//                   <motion.div key={i} className="stat-card rounded-2xl p-6"
//                     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.1 }}>
//                     <div className="text-gray-500 text-xs uppercase tracking-widest mb-3"
//                       style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>{s.label}</div>
//                     <div className="gold-text text-4xl font-thin mb-1"
//                       style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
//                     <div className="text-gray-600 text-xs">{s.sub}</div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Charts row */}
//               <div className="grid md:grid-cols-2 gap-6 mb-8">
//                 {/* Daily trend */}
//                 <div className="glass rounded-2xl p-6">
//                   <div className="text-gray-400 text-xs uppercase tracking-widest mb-6"
//                     style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem" }}>Enquiries — Last 7 Days</div>
//                   {stats?.daily?.length ? (
//                     <div className="flex items-end gap-2 h-32">
//                       {stats.daily.map((d, i) => {
//                         const max = Math.max(...stats.daily.map(x => x.count), 1)
//                         const pct = (d.count / max) * 100
//                         return (
//                           <div key={i} className="flex-1 flex flex-col items-center gap-2">
//                             <div className="text-yellow-500/60 text-xs">{d.count}</div>
//                             <div className="w-full rounded-sm transition-all duration-500"
//                               style={{ height: `${Math.max(pct, 4)}%`, background: "linear-gradient(to top, #C9A84C, #F0D080)", opacity: 0.8 }} />
//                             <div className="text-gray-600 text-xs" style={{ fontSize: "0.55rem" }}>
//                               {new Date(d._id).toLocaleDateString("en", { weekday: "short" })}
//                             </div>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   ) : (
//                     <div className="h-32 flex items-center justify-center text-gray-600 text-sm">No data yet</div>
//                   )}
//                 </div>

//                 {/* Room type breakdown */}
//                 <div className="glass rounded-2xl p-6">
//                   <div className="text-gray-400 text-xs uppercase tracking-widest mb-6"
//                     style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem" }}>Enquiries by Room Type</div>
//                   {stats?.byRoom?.length ? (
//                     <div className="flex flex-col gap-3">
//                       {stats.byRoom.map((r, i) => {
//                         const max = stats.byRoom[0].count
//                         const pct = (r.count / max) * 100
//                         return (
//                           <div key={i} className="flex items-center gap-4">
//                             <div className="text-gray-300 text-sm w-32 truncate">{r._id || "Unspecified"}</div>
//                             <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
//                               <motion.div className="h-2 rounded-full"
//                                 style={{ background: "linear-gradient(90deg, #C9A84C, #F0D080)" }}
//                                 initial={{ width: 0 }} animate={{ width: `${pct}%` }}
//                                 transition={{ delay: i * 0.1, duration: 0.8 }} />
//                             </div>
//                             <div className="text-yellow-500/70 text-sm w-6 text-right">{r.count}</div>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   ) : (
//                     <div className="h-32 flex items-center justify-center text-gray-600 text-sm">No data yet</div>
//                   )}
//                 </div>
//               </div>

//               {/* Recent enquiries mini table */}
//               <div className="glass rounded-2xl p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="text-gray-400 text-xs uppercase tracking-widest"
//                     style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem" }}>Recent Enquiries</div>
//                   <button onClick={() => setTab("enquiries")} className="btn-ghost">View All</button>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="text-gray-600 text-xs uppercase tracking-wider border-b" style={{ borderColor: "rgba(201,168,76,0.1)", fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>
//                         <th className="text-left py-3 pr-4">Guest</th>
//                         <th className="text-left py-3 pr-4">Room</th>
//                         <th className="text-left py-3 pr-4">Dates</th>
//                         <th className="text-left py-3">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {enquiries.slice(0, 5).map((e) => (
//                         <tr key={e._id} className="data-row border-b transition-colors"
//                           style={{ borderColor: "rgba(201,168,76,0.06)" }}>
//                           <td className="py-3 pr-4">
//                             <div className="text-white">{e.name}</div>
//                             <div className="text-gray-600 text-xs">{e.phone}</div>
//                           </td>
//                           <td className="py-3 pr-4 text-gray-400">{e.roomType}</td>
//                           <td className="py-3 pr-4 text-gray-500 text-xs">
//                             {new Date(e.checkIn).toLocaleDateString("en-IN")} →{" "}
//                             {new Date(e.checkOut).toLocaleDateString("en-IN")}
//                           </td>
//                           <td className="py-3"><StatusBadge status={e.status} /></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   {!enquiries.length && (
//                     <div className="text-center text-gray-600 py-10">No enquiries yet</div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* ══ ENQUIRIES ══ */}
//           {tab === "enquiries" && (
//             <motion.div className="p-8 md:p-12"
//               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//               <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
//                 <div>
//                   <div className="text-yellow-500/50 tracking-widest uppercase mb-2 text-xs" style={{ fontFamily: "'Cinzel', serif" }}>Manage</div>
//                   <h1 className="gold-text text-4xl md:text-5xl font-thin" style={{ fontFamily: "'Playfair Display', serif" }}>Enquiries</h1>
//                 </div>
//                 {/* Filter */}
//                 <div className="flex gap-2 flex-wrap">
//                   {["", "new", "contacted", "resolved"].map((s) => (
//                     <button key={s} onClick={() => setStatusFilter(s)}
//                       className="text-xs px-4 py-2 rounded-full transition-all"
//                       style={{
//                         fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.15em",
//                         background: statusFilter === s ? "rgba(201,168,76,0.15)" : "transparent",
//                         border: `1px solid ${statusFilter === s ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.08)"}`,
//                         color: statusFilter === s ? "#C9A84C" : "rgba(255,255,255,0.4)",
//                       }}>
//                       {s || "All"}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="glass rounded-2xl overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="border-b text-gray-600 uppercase tracking-wider"
//                         style={{ borderColor: "rgba(201,168,76,0.1)", fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>
//                         <th className="text-left p-5">Guest</th>
//                         <th className="text-left p-5">Contact</th>
//                         <th className="text-left p-5">Room</th>
//                         <th className="text-left p-5">Dates</th>
//                         <th className="text-left p-5">Guests</th>
//                         <th className="text-left p-5">Status</th>
//                         <th className="text-left p-5">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {enquiries.map((e) => (
//                         <tr key={e._id} className="data-row border-b transition-colors cursor-pointer"
//                           style={{ borderColor: "rgba(201,168,76,0.06)" }}>
//                           <td className="p-5">
//                             <div className="text-white font-medium">{e.name}</div>
//                             <div className="text-gray-600 text-xs mt-0.5">
//                               {new Date(e.createdAt).toLocaleDateString("en-IN")}
//                             </div>
//                           </td>
//                           <td className="p-5">
//                             <div className="text-gray-400 text-xs">{e.email}</div>
//                             <div className="text-gray-500 text-xs mt-0.5">{e.phone}</div>
//                           </td>
//                           <td className="p-5 text-gray-300">{e.roomType}</td>
//                           <td className="p-5 text-gray-500 text-xs">
//                             <div>{new Date(e.checkIn).toLocaleDateString("en-IN")}</div>
//                             <div>{new Date(e.checkOut).toLocaleDateString("en-IN")}</div>
//                           </td>
//                           <td className="p-5 text-gray-400">{e.guests}</td>
//                           <td className="p-5"><StatusBadge status={e.status} /></td>
//                           <td className="p-5">
//                             <div className="flex gap-2 flex-wrap">
//                               <select value={e.status}
//                                 onChange={(ev) => updateStatus(e._id, ev.target.value)}
//                                 className="input-gold text-xs py-1.5 px-2 rounded-md"
//                                 style={{ width: "auto", fontSize: "0.7rem" }}>
//                                 <option value="new">New</option>
//                                 <option value="contacted">Contacted</option>
//                                 <option value="resolved">Resolved</option>
//                               </select>
//                               <button onClick={() => setEnquiryDetail(e)} className="btn-ghost" style={{ padding: "6px 12px" }}>View</button>
//                               <button onClick={() => deleteEnquiry(e._id)} className="btn-danger" style={{ padding: "6px 12px" }}>Del</button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   {!enquiries.length && (
//                     <div className="text-center text-gray-600 py-16">No enquiries found</div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* ══ REVIEWS ══ */}
//           {tab === "reviews" && (
//             <motion.div className="p-8 md:p-12"
//               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//               <div className="flex items-end justify-between mb-10">
//                 <div>
//                   <div className="text-yellow-500/50 tracking-widest uppercase mb-2 text-xs" style={{ fontFamily: "'Cinzel', serif" }}>Manage</div>
//                   <h1 className="gold-text text-4xl md:text-5xl font-thin" style={{ fontFamily: "'Playfair Display', serif" }}>Reviews</h1>
//                 </div>
//                 <button onClick={openAddReview} className="btn-gold">+ Add Review</button>
//               </div>

//               <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
//                 {reviews.map((r) => (
//                   <motion.div key={r._id} className="glass rounded-2xl p-6"
//                     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                     whileHover={{ y: -4, transition: { duration: 0.2 } }}>
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
//                           style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}>
//                           {r.guestName?.[0]?.toUpperCase()}
//                         </div>
//                         <div>
//                           <div className="text-white text-sm font-medium">{r.guestName}</div>
//                           {r.roomType && <div className="text-gray-600 text-xs">{r.roomType}</div>}
//                         </div>
//                       </div>
//                       <button onClick={() => toggleFeatured(r._id)}
//                         className="text-lg transition-all"
//                         style={{ color: r.featured ? "#C9A84C" : "rgba(255,255,255,0.15)" }}
//                         title={r.featured ? "Featured" : "Not featured"}>
//                         ★
//                       </button>
//                     </div>
//                     <Stars rating={r.rating} />
//                     <p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-3"
//                       style={{ fontStyle: "italic" }}>"{r.comment}"</p>
//                     <div className="flex gap-2 mt-5">
//                       <button onClick={() => openEditReview(r)} className="btn-ghost flex-1 text-center" style={{ padding: "7px" }}>Edit</button>
//                       <button onClick={() => deleteReview(r._id)} className="btn-danger flex-1 text-center" style={{ padding: "7px" }}>Delete</button>
//                     </div>
//                   </motion.div>
//                 ))}
//                 {!reviews.length && (
//                   <div className="col-span-3 text-center text-gray-600 py-16">No reviews yet — add your first one!</div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </main>
//       </div>

//       {/* ══ ENQUIRY DETAIL MODAL ══ */}
//       <Modal open={!!enquiryDetail} onClose={() => setEnquiryDetail(null)} title="Enquiry Details">
//         {enquiryDetail && (
//           <div className="space-y-4 text-sm">
//             {[
//               ["Name",       enquiryDetail.name],
//               ["Email",      enquiryDetail.email],
//               ["Phone",      enquiryDetail.phone],
//               ["Room Type",  enquiryDetail.roomType],
//               ["Check-in",   new Date(enquiryDetail.checkIn).toDateString()],
//               ["Check-out",  new Date(enquiryDetail.checkOut).toDateString()],
//               ["Guests",     enquiryDetail.guests],
//               ["Submitted",  new Date(enquiryDetail.createdAt).toLocaleString("en-IN")],
//             ].map(([k, v]) => (
//               <div key={k} className="flex gap-4 py-2 border-b" style={{ borderColor: "rgba(201,168,76,0.08)" }}>
//                 <span className="text-gray-600 w-24 flex-shrink-0 text-xs uppercase tracking-wider"
//                   style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", paddingTop: "2px" }}>{k}</span>
//                 <span className="text-gray-200">{v}</span>
//               </div>
//             ))}
//             {enquiryDetail.message && (
//               <div className="pt-2">
//                 <div className="text-gray-600 text-xs uppercase tracking-wider mb-2"
//                   style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>Message</div>
//                 <p className="text-gray-300 leading-relaxed">{enquiryDetail.message}</p>
//               </div>
//             )}
//             <div className="pt-2">
//               <StatusBadge status={enquiryDetail.status} />
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* ══ REVIEW FORM MODAL ══ */}
//       <Modal open={reviewModal} onClose={() => setReviewModal(false)}
//         title={editReview ? "Edit Review" : "Add Review"}>
//         <div className="space-y-4">
//           <div>
//             <label className="text-gray-500 text-xs uppercase tracking-wider block mb-2"
//               style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>Guest Name</label>
//             <input className="input-gold" value={reviewForm.guestName}
//               onChange={(e) => setReviewForm({ ...reviewForm, guestName: e.target.value })}
//               placeholder="e.g. Priya Sharma, Mumbai" />
//           </div>
//           <div>
//             <label className="text-gray-500 text-xs uppercase tracking-wider block mb-2"
//               style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>Rating</label>
//             <div className="flex gap-2">
//               {[1,2,3,4,5].map((s) => (
//                 <button key={s} onClick={() => setReviewForm({ ...reviewForm, rating: s })}
//                   className="text-2xl transition-all"
//                   style={{ color: s <= reviewForm.rating ? "#C9A84C" : "rgba(201,168,76,0.2)" }}>★</button>
//               ))}
//             </div>
//           </div>
//           <div>
//             <label className="text-gray-500 text-xs uppercase tracking-wider block mb-2"
//               style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>Room Type (optional)</label>
//             <input className="input-gold" value={reviewForm.roomType}
//               onChange={(e) => setReviewForm({ ...reviewForm, roomType: e.target.value })}
//               placeholder="e.g. Deluxe AC" />
//           </div>
//           <div>
//             <label className="text-gray-500 text-xs uppercase tracking-wider block mb-2"
//               style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem" }}>Comment</label>
//             <textarea className="input-gold" rows={4} value={reviewForm.comment}
//               onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
//               placeholder="Guest review..." style={{ resize: "none" }} />
//           </div>
//           <div className="flex items-center gap-3">
//             <button onClick={() => setReviewForm({ ...reviewForm, featured: !reviewForm.featured })}
//               className="w-5 h-5 rounded flex items-center justify-center transition-all"
//               style={{ background: reviewForm.featured ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.3)" }}>
//               {reviewForm.featured && <span className="text-yellow-500 text-xs">✓</span>}
//             </button>
//             <span className="text-gray-400 text-sm">Show on website (featured)</span>
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button onClick={saveReview} className="btn-gold flex-1">
//               {editReview ? "Save Changes" : "Add Review"}
//             </button>
//             <button onClick={() => setReviewModal(false)} className="btn-ghost flex-1">Cancel</button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   )
// }
// import { useEffect, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// const API = "http://localhost:5001/api"
// const api = (path, opts = {}) =>
//   fetch(`${API}${path}`, { credentials: "include", ...opts }).then((r) => r.json())

// /* ── Status badge ── */
// function StatusBadge({ status }) {
//   const map = {
//     new:       { label: "New",       bg: "rgba(201,168,76,0.15)",  color: "#C9A84C" },
//     contacted: { label: "Contacted", bg: "rgba(99,179,237,0.15)",  color: "#63B3ED" },
//     resolved:  { label: "Resolved",  bg: "rgba(104,211,145,0.15)", color: "#68D391" },
//   }
//   const s = map[status] || map.new
//   return (
//     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
//       style={{ background: s.bg, color: s.color, fontFamily: "'Cinzel',serif", fontSize: "0.58rem", letterSpacing: "0.1em" }}>
//       <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
//       {s.label}
//     </span>
//   )
// }

// /* ── Stars ── */
// function Stars({ rating, size = 14 }) {
//   return (
//     <span className="flex gap-0.5">
//       {[1,2,3,4,5].map((s) => (
//         <span key={s} style={{ color: s <= rating ? "#C9A84C" : "rgba(201,168,76,0.18)", fontSize: size }}>★</span>
//       ))}
//     </span>
//   )
// }

// /* ── Modal ── */
// function Modal({ open, onClose, title, children }) {
//   if (!open) return null
//   return (
//     <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//       <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
//       <motion.div className="relative w-full max-w-lg rounded-2xl p-8 z-10 overflow-y-auto max-h-[90vh]"
//         style={{ background: "#0e0e0e", border: "1px solid rgba(201,168,76,0.2)" }}
//         initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="gold-text text-xl" style={{ fontFamily: "'Playfair Display',serif" }}>{title}</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none">×</button>
//         </div>
//         {children}
//       </motion.div>
//     </motion.div>
//   )
// }

// /* ══════════════════════════════════════════ */
// export default function AdminDashboard() {
//   const [user,          setUser]          = useState(null)
//   const [loading,       setLoading]       = useState(true)
//   const [tab,           setTab]           = useState("overview")
//   const [stats,         setStats]         = useState(null)
//   const [enquiries,     setEnquiries]     = useState([])
//   const [reviews,       setReviews]       = useState([])
//   const [statusFilter,  setStatusFilter]  = useState("")
//   const [reviewFilter,  setReviewFilter]  = useState("all")
//   const [toast,         setToast]         = useState(null)
//   const [enquiryDetail, setEnquiryDetail] = useState(null)
//   const [editReview,    setEditReview]    = useState(null)
//   const [editForm,      setEditForm]      = useState({})

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type })
//     setTimeout(() => setToast(null), 3000)
//   }

//   useEffect(() => {
//     api("/auth/me").then((d) => { if (d.loggedIn) setUser(d.user); setLoading(false) })
//   }, [])

//   useEffect(() => {
//     if (!user) return
//     loadAll()
//   }, [user])

//   useEffect(() => { if (user) loadEnquiries() }, [statusFilter])

//   const loadAll       = () => { loadStats(); loadEnquiries(); loadReviews() }
//   const loadStats     = () => api("/enquiries/stats").then(setStats)
//   const loadReviews   = () => api("/reviews/all").then(setReviews)
//   const loadEnquiries = () =>
//     api(`/enquiries${statusFilter ? `?status=${statusFilter}` : ""}`).then((d) => setEnquiries(d.items || []))

//   /* enquiry actions */
//   const updateStatus = async (id, status) => {
//     await api(`/enquiries/${id}/status`, {
//       method: "PATCH", headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     })
//     loadEnquiries(); loadStats(); showToast("Status updated ✓")
//   }

//   const deleteEnquiry = async (id) => {
//     if (!confirm("Delete this enquiry permanently?")) return
//     await api(`/enquiries/${id}`, { method: "DELETE" })
//     setEnquiryDetail(null); loadEnquiries(); loadStats()
//     showToast("Enquiry deleted", "error")
//   }

//   /* review actions */
//   const toggleFeatured = async (id, name, current) => {
//     await api(`/reviews/${id}/featured`, { method: "PATCH" })
//     loadReviews()
//     showToast(current ? `"${name}" hidden from website` : `"${name}" approved & live on website ✓`)
//   }

//   const deleteReview = async (id) => {
//     if (!confirm("Delete this review?")) return
//     await api(`/reviews/${id}`, { method: "DELETE" })
//     loadReviews(); showToast("Review deleted", "error")
//   }

//   const saveEditReview = async () => {
//     await api(`/reviews/${editReview._id}`, {
//       method: "PUT", headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(editForm),
//     })
//     setEditReview(null); loadReviews(); showToast("Review updated ✓")
//   }

//   const logout = async () => { await api("/auth/logout", { method: "POST" }); setUser(null) }

//   /* filtered reviews */
//   const filteredReviews = reviews.filter((r) => {
//     if (reviewFilter === "pending")  return !r.featured
//     if (reviewFilter === "approved") return  r.featured
//     return true
//   })
//   const pendingCount = reviews.filter((r) => !r.featured).length

//   /* ── Loading ── */
//   if (loading) return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <motion.div className="w-8 h-8 rounded-full border-2 border-yellow-500/30 border-t-yellow-500"
//         animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
//     </div>
//   )

//   /* ══ LOGIN ══ */
//   if (!user) return (
//     <div className="min-h-screen flex items-center justify-center" style={{ background: "#060606" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&family=Cinzel:wght@400;700&display=swap');
//         .gold-text{background:linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
//       `}</style>
//       {[400,260,140].map((sz,i) => (
//         <motion.div key={i} className="absolute rounded-full pointer-events-none"
//           style={{ width: sz, height: sz, border: "1px solid rgba(201,168,76,0.07)" }}
//           animate={{ rotate: i%2===0?360:-360 }} transition={{ duration: 18+i*8, repeat: Infinity, ease:"linear" }} />
//       ))}
//       <motion.div className="relative z-10 text-center px-8"
//         initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:1 }}>
//         <img src="/supriyalogo.png" alt="Supriya" className="mx-auto mb-8"
//           style={{ height:"80px", filter:"drop-shadow(0 0 20px rgba(201,168,76,0.5))" }} />
//         <h1 className="gold-text text-5xl font-thin mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>Admin Portal</h1>
//         <p className="text-gray-600 mb-12 tracking-[0.4em] uppercase text-xs" style={{ fontFamily:"'Cinzel',serif" }}>
//           Hotel Supriya International
//         </p>
//         <motion.a href="http://localhost:5001/api/auth/google"
//           className="inline-flex items-center gap-4 px-10 py-4 rounded-sm"
//           style={{ background:"linear-gradient(135deg,#C9A84C,#F0D080)", color:"black" }}
//           whileHover={{ scale:1.04, boxShadow:"0 20px 60px rgba(201,168,76,0.35)" }}>
//           <svg width="20" height="20" viewBox="0 0 24 24">
//             <path fill="#333" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//             <path fill="#333" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//             <path fill="#333" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//             <path fill="#333" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//           </svg>
//           <span style={{ fontFamily:"'Cinzel',serif", fontSize:"0.72rem", letterSpacing:"0.2em", fontWeight:700 }}>
//             SIGN IN WITH GOOGLE
//           </span>
//         </motion.a>
//         <p className="text-gray-700 text-xs mt-8" style={{ fontFamily:"'Cinzel',serif" }}>
//           Restricted to authorised personnel only
//         </p>
//       </motion.div>
//     </div>
//   )

//   /* ══ DASHBOARD ══ */
//   return (
//     <div className="min-h-screen flex" style={{ background:"#060606", fontFamily:"'Cormorant Garamond',serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700&family=Cormorant+Garamond:wght@300;400;500&family=Cinzel:wght@400;700&display=swap');
//         .gold-text{background:linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
//         .glass{background:rgba(255,255,255,0.025);border:1px solid rgba(201,168,76,0.12);}
//         .stat-card{background:linear-gradient(135deg,rgba(201,168,76,0.07),rgba(0,0,0,0.5));border:1px solid rgba(201,168,76,0.14);transition:all 0.3s;}
//         .stat-card:hover{border-color:rgba(201,168,76,0.35);transform:translateY(-4px);}
//         .data-row:hover{background:rgba(201,168,76,0.03);}
//         .input-gold{background:rgba(255,255,255,0.04);border:1px solid rgba(201,168,76,0.2);border-radius:8px;color:white;padding:10px 14px;width:100%;outline:none;font-family:'Cormorant Garamond',serif;font-size:1rem;transition:border 0.3s;}
//         .input-gold:focus{border-color:rgba(201,168,76,0.55);}
//         .btn-gold{background:linear-gradient(135deg,#C9A84C,#F0D080);color:black;font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.18em;font-weight:700;padding:9px 22px;border-radius:6px;transition:all 0.3s;}
//         .btn-gold:hover{transform:translateY(-1px);box-shadow:0 10px 30px rgba(201,168,76,0.3);}
//         .btn-ghost{background:transparent;border:1px solid rgba(201,168,76,0.22);color:rgba(201,168,76,0.7);font-family:'Cinzel',serif;font-size:0.57rem;letter-spacing:0.14em;padding:7px 18px;border-radius:6px;transition:all 0.3s;}
//         .btn-ghost:hover{border-color:rgba(201,168,76,0.55);color:#C9A84C;}
//         .btn-approve{background:rgba(104,211,145,0.1);border:1px solid rgba(104,211,145,0.3);color:#68D391;font-family:'Cinzel',serif;font-size:0.57rem;letter-spacing:0.12em;padding:7px 16px;border-radius:6px;transition:all 0.3s;}
//         .btn-approve:hover{background:rgba(104,211,145,0.2);}
//         .btn-hide{background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.25);color:#FBB724;font-family:'Cinzel',serif;font-size:0.57rem;letter-spacing:0.12em;padding:7px 16px;border-radius:6px;transition:all 0.3s;}
//         .btn-hide:hover{background:rgba(251,191,36,0.15);}
//         .btn-danger{background:transparent;border:1px solid rgba(252,129,129,0.22);color:rgba(252,129,129,0.7);font-family:'Cinzel',serif;font-size:0.57rem;padding:7px 14px;border-radius:6px;transition:all 0.3s;}
//         .btn-danger:hover{border-color:rgba(252,129,129,0.55);color:#FC8181;}
//         ::-webkit-scrollbar{width:3px;height:3px;}
//         ::-webkit-scrollbar-thumb{background:#8B6914;border-radius:2px;}
//         select option{background:#111;}
//       `}</style>

//       {/* ── TOAST ── */}
//       <AnimatePresence>
//         {toast && (
//           <motion.div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm backdrop-blur-sm"
//             style={{
//               background: toast.type==="error" ? "rgba(252,129,129,0.12)" : "rgba(104,211,145,0.12)",
//               border: `1px solid ${toast.type==="error" ? "rgba(252,129,129,0.3)" : "rgba(104,211,145,0.3)"}`,
//               color: toast.type==="error" ? "#FC8181" : "#68D391",
//             }}
//             initial={{ x:60, opacity:0 }} animate={{ x:0, opacity:1 }} exit={{ x:60, opacity:0 }}>
//             {toast.msg}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ════ SIDEBAR ════ */}
//       <aside className="w-60 flex-shrink-0 flex flex-col"
//         style={{ background:"rgba(10,10,10,0.9)", borderRight:"1px solid rgba(201,168,76,0.1)" }}>
//         <div className="p-7 border-b" style={{ borderColor:"rgba(201,168,76,0.1)" }}>
//           <div className="flex items-center gap-3">
//             <img src="/supriyalogo.png" alt="Supriya"
//               style={{ height:"38px", filter:"drop-shadow(0 0 8px rgba(201,168,76,0.4))" }} />
//             <div>
//               <div className="gold-text font-bold" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.78rem", letterSpacing:"0.12em" }}>Supriya</div>
//               <div className="text-gray-700 tracking-widest uppercase" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.42rem" }}>Admin Portal</div>
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 p-5 flex flex-col gap-1.5">
//           {[
//             { id:"overview",  icon:"◈", label:"Overview"  },
//             { id:"enquiries", icon:"◉", label:"Enquiries", badge: stats?.newCount || 0 },
//             { id:"reviews",   icon:"◆", label:"Reviews",   badge: pendingCount },
//           ].map((item) => (
//             <button key={item.id} onClick={() => setTab(item.id)}
//               className="flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all"
//               style={{
//                 background: tab===item.id ? "rgba(201,168,76,0.1)" : "transparent",
//                 border: `1px solid ${tab===item.id ? "rgba(201,168,76,0.22)" : "transparent"}`,
//                 color: tab===item.id ? "#C9A84C" : "rgba(255,255,255,0.3)",
//                 fontFamily:"'Cinzel',serif", fontSize:"0.6rem", letterSpacing:"0.2em",
//               }}>
//               <span style={{ fontSize:"0.75rem" }}>{item.icon}</span>
//               {item.label}
//               {item.badge > 0 && (
//                 <span className="ml-auto px-2 py-0.5 rounded-full text-black font-bold"
//                   style={{ background:"#C9A84C", fontSize:"0.58rem" }}>{item.badge}</span>
//               )}
//             </button>
//           ))}
//         </nav>

//         <div className="p-5 border-t" style={{ borderColor:"rgba(201,168,76,0.1)" }}>
//           <div className="flex items-center gap-3 mb-4">
//             {user.avatar
//               ? <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
//               : <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
//                   style={{ background:"rgba(201,168,76,0.2)", color:"#C9A84C" }}>{user.name?.[0]}</div>
//             }
//             <div className="overflow-hidden">
//               <div className="text-white text-xs truncate">{user.name}</div>
//               <div className="text-gray-600 text-xs truncate">{user.email}</div>
//             </div>
//           </div>
//           <button onClick={logout} className="btn-ghost w-full text-center">Sign Out</button>
//         </div>
//       </aside>

//       {/* ════ MAIN ════ */}
//       <main className="flex-1 overflow-auto">

//         {/* ══ OVERVIEW ══ */}
//         {tab === "overview" && (
//           <motion.div className="p-8 md:p-12"
//             initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
//             <div className="mb-10">
//               <div className="tracking-[0.5em] uppercase mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.62rem", color:"rgba(201,168,76,0.5)" }}>Dashboard</div>
//               <h1 className="gold-text font-thin" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.5rem,5vw,4rem)" }}>Overview</h1>
//             </div>

//             {/* Stat cards */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
//               {[
//                 { label:"Total Enquiries", value: stats?.total     ?? "—", icon:"◈", sub:"All time"      },
//                 { label:"New",             value: stats?.newCount  ?? "—", icon:"◉", sub:"Need action"   },
//                 { label:"Contacted",       value: stats?.contacted ?? "—", icon:"◐", sub:"In progress"   },
//                 { label:"Resolved",        value: stats?.resolved  ?? "—", icon:"◆", sub:"Completed"     },
//               ].map((s,i) => (
//                 <motion.div key={i} className="stat-card rounded-2xl p-6"
//                   initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}>
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="text-gray-600 uppercase tracking-widest" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>{s.label}</div>
//                     <span className="text-yellow-500/30 text-lg">{s.icon}</span>
//                   </div>
//                   <div className="gold-text font-thin mb-1" style={{ fontFamily:"'Playfair Display',serif", fontSize:"3rem", lineHeight:1 }}>{s.value}</div>
//                   <div className="text-gray-600 text-xs mt-2">{s.sub}</div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Charts */}
//             <div className="grid md:grid-cols-2 gap-6 mb-8">
//               {/* Bar chart */}
//               <div className="glass rounded-2xl p-7">
//                 <div className="text-gray-500 uppercase tracking-widest mb-6" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.58rem" }}>
//                   Enquiries — Last 7 Days
//                 </div>
//                 {stats?.daily?.length ? (
//                   <div className="flex items-end gap-2" style={{ height:"120px" }}>
//                     {(() => {
//                       // fill missing days
//                       const days = []
//                       for (let i = 6; i >= 0; i--) {
//                         const d = new Date(); d.setDate(d.getDate() - i)
//                         const key = d.toISOString().split("T")[0]
//                         const found = stats.daily.find(x => x._id === key)
//                         days.push({ date: key, count: found?.count || 0 })
//                       }
//                       const max = Math.max(...days.map(d => d.count), 1)
//                       return days.map((d, i) => (
//                         <div key={i} className="flex-1 flex flex-col items-center gap-2">
//                           <div className="text-yellow-500/50 text-xs" style={{ fontSize:"0.6rem" }}>{d.count || ""}</div>
//                           <motion.div className="w-full rounded-t"
//                             style={{ background:"linear-gradient(to top,#C9A84C,#F0D080)", opacity: d.count ? 0.85 : 0.15, minHeight:"4px" }}
//                             initial={{ height:0 }} animate={{ height:`${Math.max((d.count/max)*90, d.count ? 6 : 2)}px` }}
//                             transition={{ delay:i*0.08, duration:0.6 }} />
//                           <div className="text-gray-600" style={{ fontSize:"0.55rem", fontFamily:"'Cinzel',serif" }}>
//                             {new Date(d.date).toLocaleDateString("en",{ weekday:"short" })}
//                           </div>
//                         </div>
//                       ))
//                     })()}
//                   </div>
//                 ) : <div className="h-28 flex items-center justify-center text-gray-700 text-sm">Submit enquiries to see data</div>}
//               </div>

//               {/* Room breakdown */}
//               <div className="glass rounded-2xl p-7">
//                 <div className="text-gray-500 uppercase tracking-widest mb-6" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.58rem" }}>
//                   Enquiries by Room Type
//                 </div>
//                 {stats?.byRoom?.length ? (
//                   <div className="flex flex-col gap-4">
//                     {stats.byRoom.map((r, i) => {
//                       const max = stats.byRoom[0].count
//                       return (
//                         <div key={i} className="flex items-center gap-3">
//                           <div className="text-gray-400 text-sm" style={{ width:"140px", fontSize:"0.85rem" }}>{r._id || "Other"}</div>
//                           <div className="flex-1 rounded-full" style={{ height:"6px", background:"rgba(255,255,255,0.05)" }}>
//                             <motion.div className="h-full rounded-full"
//                               style={{ background:"linear-gradient(90deg,#C9A84C,#F0D080)" }}
//                               initial={{ width:0 }} animate={{ width:`${(r.count/max)*100}%` }}
//                               transition={{ delay:i*0.1, duration:0.8 }} />
//                           </div>
//                           <div className="text-yellow-500/60 text-sm w-5 text-right">{r.count}</div>
//                         </div>
//                       )
//                     })}
//                   </div>
//                 ) : <div className="h-28 flex items-center justify-center text-gray-700 text-sm">No data yet</div>}
//               </div>
//             </div>

//             {/* Review stats */}
//             <div className="glass rounded-2xl p-7 mb-6">
//               <div className="text-gray-500 uppercase tracking-widest mb-6" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.58rem" }}>
//                 Reviews at a Glance
//               </div>
//               <div className="flex gap-10 flex-wrap">
//                 {[
//                   { label:"Total Reviews",    value: reviews.length,                                     color:"#C9A84C" },
//                   { label:"Pending Approval", value: reviews.filter(r=>!r.featured).length,              color:"#63B3ED" },
//                   { label:"Live on Website",  value: reviews.filter(r=> r.featured).length,              color:"#68D391" },
//                   { label:"Avg Rating",       value: reviews.length ? (reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1)+"★" : "—", color:"#C9A84C" },
//                 ].map((s,i) => (
//                   <div key={i}>
//                     <div className="font-thin mb-1" style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.2rem", color:s.color }}>{s.value}</div>
//                     <div className="text-gray-600 uppercase tracking-wider" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>{s.label}</div>
//                   </div>
//                 ))}
//               </div>
//               {pendingCount > 0 && (
//                 <div className="mt-5 flex items-center gap-3 px-4 py-3 rounded-lg"
//                   style={{ background:"rgba(201,168,76,0.07)", border:"1px solid rgba(201,168,76,0.2)" }}>
//                   <span style={{ color:"#C9A84C" }}>⚠</span>
//                   <span className="text-yellow-500/70 text-sm">{pendingCount} review{pendingCount>1?"s":""} waiting for approval</span>
//                   <button onClick={() => setTab("reviews")} className="ml-auto btn-ghost" style={{ padding:"5px 14px" }}>Review Now</button>
//                 </div>
//               )}
//             </div>

//             {/* Recent enquiries */}
//             <div className="glass rounded-2xl overflow-hidden">
//               <div className="flex items-center justify-between p-6 border-b" style={{ borderColor:"rgba(201,168,76,0.08)" }}>
//                 <div className="text-gray-500 uppercase tracking-widest" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.58rem" }}>Recent Enquiries</div>
//                 <button onClick={() => setTab("enquiries")} className="btn-ghost" style={{ padding:"6px 14px" }}>View All</button>
//               </div>
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="text-gray-600 border-b uppercase" style={{ borderColor:"rgba(201,168,76,0.08)", fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>
//                     {["Guest","Room","Check-in","Status"].map(h => <th key={h} className="text-left px-6 py-3">{h}</th>)}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {enquiries.slice(0,6).map((e) => (
//                     <tr key={e._id} className="data-row border-b transition-colors" style={{ borderColor:"rgba(201,168,76,0.05)" }}>
//                       <td className="px-6 py-4">
//                         <div className="text-white text-sm">{e.name}</div>
//                         <div className="text-gray-600 text-xs">{e.phone}</div>
//                       </td>
//                       <td className="px-6 py-4 text-gray-400 text-sm">{e.roomType}</td>
//                       <td className="px-6 py-4 text-gray-500 text-xs">{new Date(e.checkIn).toLocaleDateString("en-IN")}</td>
//                       <td className="px-6 py-4"><StatusBadge status={e.status} /></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {!enquiries.length && <div className="text-center text-gray-700 py-12">No enquiries yet</div>}
//             </div>
//           </motion.div>
//         )}

//         {/* ══ ENQUIRIES ══ */}
//         {tab === "enquiries" && (
//           <motion.div className="p-8 md:p-12"
//             initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
//               <div>
//                 <div className="tracking-[0.5em] uppercase mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.62rem", color:"rgba(201,168,76,0.5)" }}>Manage</div>
//                 <h1 className="gold-text font-thin" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.5rem,5vw,4rem)" }}>Enquiries</h1>
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 {[["","All"], ["new","New"], ["contacted","Contacted"], ["resolved","Resolved"]].map(([val, label]) => (
//                   <button key={val} onClick={() => setStatusFilter(val)}
//                     className="px-4 py-2 rounded-full transition-all"
//                     style={{
//                       fontFamily:"'Cinzel',serif", fontSize:"0.57rem", letterSpacing:"0.15em",
//                       background: statusFilter===val ? "rgba(201,168,76,0.14)" : "transparent",
//                       border: `1px solid ${statusFilter===val ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.07)"}`,
//                       color: statusFilter===val ? "#C9A84C" : "rgba(255,255,255,0.35)",
//                     }}>{label}</button>
//                 ))}
//               </div>
//             </div>

//             <div className="glass rounded-2xl overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b text-gray-600 uppercase" style={{ borderColor:"rgba(201,168,76,0.1)", fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>
//                       {["Guest","Contact","Room","Dates","Guests","Status","Actions"].map(h=>(
//                         <th key={h} className="text-left px-5 py-4">{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {enquiries.map((e) => (
//                       <tr key={e._id} className="data-row border-b transition-colors" style={{ borderColor:"rgba(201,168,76,0.05)" }}>
//                         <td className="px-5 py-4">
//                           <div className="text-white text-sm font-medium">{e.name}</div>
//                           <div className="text-gray-600 text-xs mt-0.5">{new Date(e.createdAt).toLocaleDateString("en-IN")}</div>
//                         </td>
//                         <td className="px-5 py-4">
//                           <div className="text-gray-400 text-xs">{e.email}</div>
//                           <div className="text-gray-500 text-xs mt-0.5">{e.phone}</div>
//                         </td>
//                         <td className="px-5 py-4 text-gray-300 text-sm">{e.roomType}</td>
//                         <td className="px-5 py-4 text-xs text-gray-500">
//                           <div>{new Date(e.checkIn).toLocaleDateString("en-IN")}</div>
//                           <div>{new Date(e.checkOut).toLocaleDateString("en-IN")}</div>
//                         </td>
//                         <td className="px-5 py-4 text-gray-400 text-sm">{e.guests}</td>
//                         <td className="px-5 py-4"><StatusBadge status={e.status} /></td>
//                         <td className="px-5 py-4">
//                           <div className="flex gap-2 flex-wrap">
//                             <select value={e.status} onChange={(ev) => updateStatus(e._id, ev.target.value)}
//                               className="input-gold" style={{ width:"auto", fontSize:"0.72rem", padding:"5px 10px" }}>
//                               <option value="new">New</option>
//                               <option value="contacted">Contacted</option>
//                               <option value="resolved">Resolved</option>
//                             </select>
//                             <button onClick={() => setEnquiryDetail(e)} className="btn-ghost" style={{ padding:"5px 12px" }}>View</button>
//                             <button onClick={() => deleteEnquiry(e._id)} className="btn-danger" style={{ padding:"5px 10px" }}>Del</button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {!enquiries.length && <div className="text-center text-gray-700 py-16">No enquiries found</div>}
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* ══ REVIEWS ══ */}
//         {tab === "reviews" && (
//           <motion.div className="p-8 md:p-12"
//             initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
//               <div>
//                 <div className="tracking-[0.5em] uppercase mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.62rem", color:"rgba(201,168,76,0.5)" }}>Manage</div>
//                 <h1 className="gold-text font-thin" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.5rem,5vw,4rem)" }}>Guest Reviews</h1>
//                 <p className="text-gray-600 text-sm mt-2">Guests submit reviews on the website. Approve them to show on the homepage.</p>
//               </div>
//               <div className="flex gap-2">
//                 {[["all","All"], ["pending","Pending"], ["approved","Approved"]].map(([val,label]) => (
//                   <button key={val} onClick={() => setReviewFilter(val)}
//                     className="px-4 py-2 rounded-full transition-all"
//                     style={{
//                       fontFamily:"'Cinzel',serif", fontSize:"0.57rem", letterSpacing:"0.15em",
//                       background: reviewFilter===val ? "rgba(201,168,76,0.14)" : "transparent",
//                       border: `1px solid ${reviewFilter===val ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.07)"}`,
//                       color: reviewFilter===val ? "#C9A84C" : "rgba(255,255,255,0.35)",
//                     }}>{label} {val==="pending" && pendingCount > 0 ? `(${pendingCount})` : ""}</button>
//                 ))}
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
//               {filteredReviews.map((r) => (
//                 <motion.div key={r._id} className="glass rounded-2xl p-6 flex flex-col"
//                   initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
//                   style={{ borderColor: r.featured ? "rgba(104,211,145,0.2)" : "rgba(201,168,76,0.12)" }}>
//                   {/* Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
//                         style={{ background:"rgba(201,168,76,0.12)", color:"#C9A84C", fontSize:"1rem" }}>
//                         {r.guestName?.[0]?.toUpperCase()}
//                       </div>
//                       <div>
//                         <div className="text-white text-sm font-medium">{r.guestName}</div>
//                         {r.roomType && <div className="text-gray-600 text-xs">{r.roomType}</div>}
//                       </div>
//                     </div>
//                     {/* Status pill */}
//                     <span className="px-2.5 py-1 rounded-full text-xs"
//                       style={{
//                         background: r.featured ? "rgba(104,211,145,0.12)" : "rgba(251,191,36,0.1)",
//                         color: r.featured ? "#68D391" : "#FBB724",
//                         fontFamily:"'Cinzel',serif", fontSize:"0.5rem", letterSpacing:"0.1em",
//                       }}>
//                       {r.featured ? "● Live" : "○ Pending"}
//                     </span>
//                   </div>

//                   <Stars rating={r.rating} />
//                   <p className="text-gray-400 text-sm mt-3 leading-relaxed flex-1"
//                     style={{ fontStyle:"italic" }}>"{r.comment}"</p>
//                   <div className="text-gray-700 text-xs mt-3">
//                     {new Date(r.createdAt).toLocaleDateString("en-IN")}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2 mt-4 flex-wrap">
//                     {r.featured
//                       ? <button onClick={() => toggleFeatured(r._id, r.guestName, true)}  className="btn-hide flex-1">Hide</button>
//                       : <button onClick={() => toggleFeatured(r._id, r.guestName, false)} className="btn-approve flex-1">Approve</button>
//                     }
//                     <button onClick={() => { setEditReview(r); setEditForm({ guestName:r.guestName, rating:r.rating, comment:r.comment, roomType:r.roomType||"" }) }}
//                       className="btn-ghost" style={{ padding:"7px 14px" }}>Edit</button>
//                     <button onClick={() => deleteReview(r._id)} className="btn-danger" style={{ padding:"7px 12px" }}>Del</button>
//                   </div>
//                 </motion.div>
//               ))}
//               {!filteredReviews.length && (
//                 <div className="col-span-3 text-center text-gray-700 py-20">
//                   {reviewFilter==="pending" ? "No pending reviews — all caught up! ✓" : "No reviews yet"}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </main>

//       {/* ══ ENQUIRY DETAIL MODAL ══ */}
//       <AnimatePresence>
//         {enquiryDetail && (
//           <Modal open={!!enquiryDetail} onClose={() => setEnquiryDetail(null)} title="Enquiry Details">
//             <div className="space-y-1 text-sm">
//               {[
//                 ["Name",      enquiryDetail.name],
//                 ["Email",     enquiryDetail.email],
//                 ["Phone",     enquiryDetail.phone],
//                 ["Room",      enquiryDetail.roomType],
//                 ["Check-in",  new Date(enquiryDetail.checkIn).toDateString()],
//                 ["Check-out", new Date(enquiryDetail.checkOut).toDateString()],
//                 ["Guests",    enquiryDetail.guests],
//                 ["Submitted", new Date(enquiryDetail.createdAt).toLocaleString("en-IN")],
//               ].map(([k,v]) => (
//                 <div key={k} className="flex gap-4 py-2.5 border-b" style={{ borderColor:"rgba(201,168,76,0.07)" }}>
//                   <span className="text-gray-600 flex-shrink-0 uppercase" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem", letterSpacing:"0.15em", width:"80px", paddingTop:"2px" }}>{k}</span>
//                   <span className="text-gray-200">{v}</span>
//                 </div>
//               ))}
//               {enquiryDetail.message && (
//                 <div className="py-3">
//                   <div className="text-gray-600 uppercase mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>Message</div>
//                   <p className="text-gray-300 leading-relaxed text-sm">{enquiryDetail.message}</p>
//                 </div>
//               )}
//               <div className="pt-3 flex gap-3">
//                 <select value={enquiryDetail.status}
//                   onChange={(e) => { updateStatus(enquiryDetail._id, e.target.value); setEnquiryDetail({...enquiryDetail, status:e.target.value}) }}
//                   className="input-gold flex-1" style={{ fontSize:"0.8rem" }}>
//                   <option value="new">New</option>
//                   <option value="contacted">Contacted</option>
//                   <option value="resolved">Resolved</option>
//                 </select>
//                 <button onClick={() => deleteEnquiry(enquiryDetail._id)} className="btn-danger">Delete</button>
//               </div>
//             </div>
//           </Modal>
//         )}
//       </AnimatePresence>

//       {/* ══ EDIT REVIEW MODAL ══ */}
//       <AnimatePresence>
//         {editReview && (
//           <Modal open={!!editReview} onClose={() => setEditReview(null)} title="Edit Review">
//             <div className="space-y-4">
//               <div>
//                 <label className="text-gray-600 uppercase text-xs tracking-wider block mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>Guest Name</label>
//                 <input className="input-gold" value={editForm.guestName}
//                   onChange={(e) => setEditForm({...editForm, guestName:e.target.value})} />
//               </div>
//               <div>
//                 <label className="text-gray-600 uppercase text-xs tracking-wider block mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>Rating</label>
//                 <div className="flex gap-2">
//                   {[1,2,3,4,5].map((s) => (
//                     <button key={s} onClick={() => setEditForm({...editForm, rating:s})}
//                       className="text-2xl transition-all"
//                       style={{ color: s<=editForm.rating ? "#C9A84C" : "rgba(201,168,76,0.18)" }}>★</button>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="text-gray-600 uppercase text-xs tracking-wider block mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>Room Type</label>
//                 <input className="input-gold" value={editForm.roomType}
//                   onChange={(e) => setEditForm({...editForm, roomType:e.target.value})} placeholder="e.g. Deluxe AC" />
//               </div>
//               <div>
//                 <label className="text-gray-600 uppercase text-xs tracking-wider block mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>Comment</label>
//                 <textarea className="input-gold" rows={4} value={editForm.comment}
//                   onChange={(e) => setEditForm({...editForm, comment:e.target.value})}
//                   style={{ resize:"none" }} />
//               </div>
//               <div className="flex gap-3 pt-2">
//                 <button onClick={saveEditReview} className="btn-gold flex-1">Save Changes</button>
//                 <button onClick={() => setEditReview(null)} className="btn-ghost flex-1">Cancel</button>
//               </div>
//             </div>
//           </Modal>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const API = "http://localhost:5001/api"
const api = (path, opts = {}) =>
  fetch(`${API}${path}`, { credentials: "include", ...opts }).then((r) => r.json())

/* ── Status badge ── */
function StatusBadge({ status }) {
  const map = {
    new:       { label: "New",       bg: "rgba(201,168,76,0.15)",  color: "#C9A84C" },
    contacted: { label: "Contacted", bg: "rgba(99,179,237,0.15)",  color: "#63B3ED" },
    resolved:  { label: "Resolved",  bg: "rgba(104,211,145,0.15)", color: "#68D391" },
  }
  const s = map[status] || map.new
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{ background: s.bg, color: s.color, fontFamily: "'Cinzel',serif", fontSize: "0.58rem", letterSpacing: "0.1em" }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  )
}

/* ── Stars ── */
function Stars({ rating, size = 14 }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "#C9A84C" : "rgba(201,168,76,0.18)", fontSize: size }}>★</span>
      ))}
    </span>
  )
}

/* ── Modal ── */
function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative w-full max-w-lg rounded-2xl p-8 z-10 overflow-y-auto max-h-[90vh]"
        style={{ background: "#0e0e0e", border: "1px solid rgba(201,168,76,0.2)" }}
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="gold-text text-xl" style={{ fontFamily: "'Playfair Display',serif" }}>{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none">×</button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════ */
export default function AdminDashboard() {
  const [user,          setUser]          = useState(null)
  const [loading,       setLoading]       = useState(true)
  const [tab,           setTab]           = useState("overview")
  const [stats,         setStats]         = useState(null)
  const [enquiries,     setEnquiries]     = useState([])
  const [reviews,       setReviews]       = useState([])
  const [statusFilter,  setStatusFilter]  = useState("")
  const [reviewFilter,  setReviewFilter]  = useState("all")
  const [toast,         setToast]         = useState(null)
  const [enquiryDetail, setEnquiryDetail] = useState(null)


  const showToast = (msg, type = "success") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    api("/auth/me").then((d) => { if (d.loggedIn) setUser(d.user); setLoading(false) })
  }, [])

  useEffect(() => {
    if (!user) return
    loadAll()
  }, [user])

  useEffect(() => { if (user) loadEnquiries() }, [statusFilter])

  const loadAll       = () => { loadStats(); loadEnquiries(); loadReviews() }
  const loadStats     = () => api("/enquiries/stats").then(setStats)
  const loadReviews   = () => api("/reviews/all").then(setReviews)
  const loadEnquiries = () =>
    api(`/enquiries${statusFilter ? `?status=${statusFilter}` : ""}`).then((d) => setEnquiries(d.items || []))

  /* enquiry actions */
  const updateStatus = async (id, status) => {
    await api(`/enquiries/${id}/status`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    loadEnquiries(); loadStats(); showToast("Status updated ✓")
  }

  const deleteEnquiry = async (id) => {
    if (!confirm("Delete this enquiry permanently?")) return
    await api(`/enquiries/${id}`, { method: "DELETE" })
    setEnquiryDetail(null); loadEnquiries(); loadStats()
    showToast("Enquiry deleted", "error")
  }

  /* review actions */
  const toggleFeatured = async (id, name, current) => {
    await api(`/reviews/${id}/featured`, { method: "PATCH" })
    loadReviews()
    showToast(current ? `"${name}" hidden from website` : `"${name}" approved & live on website ✓`)
  }

  const deleteReview = async (id) => {
    if (!confirm("Delete this review?")) return
    await api(`/reviews/${id}`, { method: "DELETE" })
    loadReviews(); showToast("Review deleted", "error")
  }



  const logout = async () => { await api("/auth/logout", { method: "POST" }); setUser(null) }

  /* filtered reviews */
  const filteredReviews = reviews.filter((r) => {
    if (reviewFilter === "pending")  return !r.featured
    if (reviewFilter === "approved") return  r.featured
    return true
  })
  const pendingCount = reviews.filter((r) => !r.featured).length

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div className="w-8 h-8 rounded-full border-2 border-yellow-500/30 border-t-yellow-500"
        animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
    </div>
  )

  /* ══ LOGIN ══ */
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#060606" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&family=Cinzel:wght@400;700&display=swap');
        .gold-text{background:linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
      `}</style>
      {[400,260,140].map((sz,i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: sz, height: sz, border: "1px solid rgba(201,168,76,0.07)" }}
          animate={{ rotate: i%2===0?360:-360 }} transition={{ duration: 18+i*8, repeat: Infinity, ease:"linear" }} />
      ))}
      <motion.div className="relative z-10 text-center px-8"
        initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:1 }}>
        <img src="/supriyalogo.png" alt="Supriya" className="mx-auto mb-8"
          style={{ height:"80px", filter:"drop-shadow(0 0 20px rgba(201,168,76,0.5))" }} />
        <h1 className="gold-text text-5xl font-thin mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>Admin Portal</h1>
        <p className="text-gray-600 mb-12 tracking-[0.4em] uppercase text-xs" style={{ fontFamily:"'Cinzel',serif" }}>
          Hotel Supriya International
        </p>
        <motion.a href="http://localhost:5001/api/auth/google"
          className="inline-flex items-center gap-4 px-10 py-4 rounded-sm"
          style={{ background:"linear-gradient(135deg,#C9A84C,#F0D080)", color:"black" }}
          whileHover={{ scale:1.04, boxShadow:"0 20px 60px rgba(201,168,76,0.35)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#333" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#333" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#333" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#333" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:"0.72rem", letterSpacing:"0.2em", fontWeight:700 }}>
            SIGN IN WITH GOOGLE
          </span>
        </motion.a>
        <p className="text-gray-700 text-xs mt-8" style={{ fontFamily:"'Cinzel',serif" }}>
          Restricted to authorised personnel only
        </p>
      </motion.div>
    </div>
  )

  /* ══ DASHBOARD ══ */
  return (
    <div className="min-h-screen flex" style={{ background:"#060606", fontFamily:"'Cormorant Garamond',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700&family=Cormorant+Garamond:wght@300;400;500&family=Cinzel:wght@400;700&display=swap');
        .gold-text{background:linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .glass{background:rgba(255,255,255,0.025);border:1px solid rgba(201,168,76,0.12);}
        .stat-card{background:linear-gradient(135deg,rgba(201,168,76,0.07),rgba(0,0,0,0.5));border:1px solid rgba(201,168,76,0.14);transition:all 0.3s;}
        .stat-card:hover{border-color:rgba(201,168,76,0.35);transform:translateY(-4px);}
        .data-row:hover{background:rgba(201,168,76,0.03);}
        .input-gold{background:rgba(255,255,255,0.04);border:1px solid rgba(201,168,76,0.2);border-radius:8px;color:white;padding:10px 14px;width:100%;outline:none;font-family:'Cormorant Garamond',serif;font-size:1rem;transition:border 0.3s;}
        .input-gold:focus{border-color:rgba(201,168,76,0.55);}
        .btn-gold{background:linear-gradient(135deg,#C9A84C,#F0D080);color:black;font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.18em;font-weight:700;padding:9px 22px;border-radius:6px;transition:all 0.3s;}
        .btn-gold:hover{transform:translateY(-1px);box-shadow:0 10px 30px rgba(201,168,76,0.3);}
        .btn-ghost{background:transparent;border:1px solid rgba(201,168,76,0.22);color:rgba(201,168,76,0.7);font-family:'Cinzel',serif;font-size:0.57rem;letter-spacing:0.14em;padding:7px 18px;border-radius:6px;transition:all 0.3s;}
        .btn-ghost:hover{border-color:rgba(201,168,76,0.55);color:#C9A84C;}
        .btn-approve{background:rgba(104,211,145,0.1);border:1px solid rgba(104,211,145,0.3);color:#68D391;font-family:'Cinzel',serif;font-size:0.57rem;letter-spacing:0.12em;padding:7px 16px;border-radius:6px;transition:all 0.3s;}
        .btn-approve:hover{background:rgba(104,211,145,0.2);}
        .btn-hide{background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.25);color:#FBB724;font-family:'Cinzel',serif;font-size:0.57rem;letter-spacing:0.12em;padding:7px 16px;border-radius:6px;transition:all 0.3s;}
        .btn-hide:hover{background:rgba(251,191,36,0.15);}
        .btn-danger{background:transparent;border:1px solid rgba(252,129,129,0.22);color:rgba(252,129,129,0.7);font-family:'Cinzel',serif;font-size:0.57rem;padding:7px 14px;border-radius:6px;transition:all 0.3s;}
        .btn-danger:hover{border-color:rgba(252,129,129,0.55);color:#FC8181;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:#8B6914;border-radius:2px;}
        select option{background:#111;}
      `}</style>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm backdrop-blur-sm"
            style={{
              background: toast.type==="error" ? "rgba(252,129,129,0.12)" : "rgba(104,211,145,0.12)",
              border: `1px solid ${toast.type==="error" ? "rgba(252,129,129,0.3)" : "rgba(104,211,145,0.3)"}`,
              color: toast.type==="error" ? "#FC8181" : "#68D391",
            }}
            initial={{ x:60, opacity:0 }} animate={{ x:0, opacity:1 }} exit={{ x:60, opacity:0 }}>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ SIDEBAR ════ */}
      <aside className="w-60 flex-shrink-0 flex flex-col"
        style={{ background:"rgba(10,10,10,0.9)", borderRight:"1px solid rgba(201,168,76,0.1)" }}>
        <div className="p-7 border-b" style={{ borderColor:"rgba(201,168,76,0.1)" }}>
          <div className="flex items-center gap-3">
            <img src="/supriyalogo.png" alt="Supriya"
              style={{ height:"38px", filter:"drop-shadow(0 0 8px rgba(201,168,76,0.4))" }} />
            <div>
              <div className="gold-text font-bold" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.78rem", letterSpacing:"0.12em" }}>Supriya</div>
              <div className="text-gray-700 tracking-widest uppercase" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.42rem" }}>Admin Portal</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-5 flex flex-col gap-1.5">
          {[
            { id:"overview",  icon:"◈", label:"Overview"  },
            { id:"enquiries", icon:"◉", label:"Enquiries", badge: stats?.newCount || 0 },
            { id:"reviews",   icon:"◆", label:"Reviews",   badge: pendingCount },
          ].map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all"
              style={{
                background: tab===item.id ? "rgba(201,168,76,0.1)" : "transparent",
                border: `1px solid ${tab===item.id ? "rgba(201,168,76,0.22)" : "transparent"}`,
                color: tab===item.id ? "#C9A84C" : "rgba(255,255,255,0.3)",
                fontFamily:"'Cinzel',serif", fontSize:"0.6rem", letterSpacing:"0.2em",
              }}>
              <span style={{ fontSize:"0.75rem" }}>{item.icon}</span>
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto px-2 py-0.5 rounded-full text-black font-bold"
                  style={{ background:"#C9A84C", fontSize:"0.58rem" }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-5 border-t" style={{ borderColor:"rgba(201,168,76,0.1)" }}>
          <div className="flex items-center gap-3 mb-4">
            {user.avatar
              ? <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
              : <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                  style={{ background:"rgba(201,168,76,0.2)", color:"#C9A84C" }}>{user.name?.[0]}</div>
            }
            <div className="overflow-hidden">
              <div className="text-white text-xs truncate">{user.name}</div>
              <div className="text-gray-600 text-xs truncate">{user.email}</div>
            </div>
          </div>
          <button onClick={logout} className="btn-ghost w-full text-center">Sign Out</button>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <main className="flex-1 overflow-auto">

        {/* ══ OVERVIEW ══ */}
        {tab === "overview" && (
          <motion.div className="p-8 md:p-12"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <div className="mb-10">
              <div className="tracking-[0.5em] uppercase mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.62rem", color:"rgba(201,168,76,0.5)" }}>Dashboard</div>
              <h1 className="gold-text font-thin" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.5rem,5vw,4rem)" }}>Overview</h1>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label:"Total Enquiries", value: stats?.total     ?? "—", icon:"◈", sub:"All time"      },
                { label:"New",             value: stats?.newCount  ?? "—", icon:"◉", sub:"Need action"   },
                { label:"Contacted",       value: stats?.contacted ?? "—", icon:"◐", sub:"In progress"   },
                { label:"Resolved",        value: stats?.resolved  ?? "—", icon:"◆", sub:"Completed"     },
              ].map((s,i) => (
                <motion.div key={i} className="stat-card rounded-2xl p-6"
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-600 uppercase tracking-widest" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>{s.label}</div>
                    <span className="text-yellow-500/30 text-lg">{s.icon}</span>
                  </div>
                  <div className="gold-text font-thin mb-1" style={{ fontFamily:"'Playfair Display',serif", fontSize:"3rem", lineHeight:1 }}>{s.value}</div>
                  <div className="text-gray-600 text-xs mt-2">{s.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Bar chart */}
              <div className="glass rounded-2xl p-7">
                <div className="text-gray-500 uppercase tracking-widest mb-6" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.58rem" }}>
                  Enquiries — Last 7 Days
                </div>
                {stats?.daily?.length ? (
                  <div className="flex items-end gap-2" style={{ height:"120px" }}>
                    {(() => {
                      // fill missing days
                      const days = []
                      for (let i = 6; i >= 0; i--) {
                        const d = new Date(); d.setDate(d.getDate() - i)
                        const key = d.toISOString().split("T")[0]
                        const found = stats.daily.find(x => x._id === key)
                        days.push({ date: key, count: found?.count || 0 })
                      }
                      const max = Math.max(...days.map(d => d.count), 1)
                      return days.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div className="text-yellow-500/50 text-xs" style={{ fontSize:"0.6rem" }}>{d.count || ""}</div>
                          <motion.div className="w-full rounded-t"
                            style={{ background:"linear-gradient(to top,#C9A84C,#F0D080)", opacity: d.count ? 0.85 : 0.15, minHeight:"4px" }}
                            initial={{ height:0 }} animate={{ height:`${Math.max((d.count/max)*90, d.count ? 6 : 2)}px` }}
                            transition={{ delay:i*0.08, duration:0.6 }} />
                          <div className="text-gray-600" style={{ fontSize:"0.55rem", fontFamily:"'Cinzel',serif" }}>
                            {new Date(d.date).toLocaleDateString("en",{ weekday:"short" })}
                          </div>
                        </div>
                      ))
                    })()}
                  </div>
                ) : <div className="h-28 flex items-center justify-center text-gray-700 text-sm">Submit enquiries to see data</div>}
              </div>

              {/* Room breakdown */}
              <div className="glass rounded-2xl p-7">
                <div className="text-gray-500 uppercase tracking-widest mb-6" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.58rem" }}>
                  Enquiries by Room Type
                </div>
                {stats?.byRoom?.length ? (
                  <div className="flex flex-col gap-4">
                    {stats.byRoom.map((r, i) => {
                      const max = stats.byRoom[0].count
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="text-gray-400 text-sm" style={{ width:"140px", fontSize:"0.85rem" }}>{r._id || "Other"}</div>
                          <div className="flex-1 rounded-full" style={{ height:"6px", background:"rgba(255,255,255,0.05)" }}>
                            <motion.div className="h-full rounded-full"
                              style={{ background:"linear-gradient(90deg,#C9A84C,#F0D080)" }}
                              initial={{ width:0 }} animate={{ width:`${(r.count/max)*100}%` }}
                              transition={{ delay:i*0.1, duration:0.8 }} />
                          </div>
                          <div className="text-yellow-500/60 text-sm w-5 text-right">{r.count}</div>
                        </div>
                      )
                    })}
                  </div>
                ) : <div className="h-28 flex items-center justify-center text-gray-700 text-sm">No data yet</div>}
              </div>
            </div>

            {/* Review stats */}
            <div className="glass rounded-2xl p-7 mb-6">
              <div className="text-gray-500 uppercase tracking-widest mb-6" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.58rem" }}>
                Reviews at a Glance
              </div>
              <div className="flex gap-10 flex-wrap">
                {[
                  { label:"Total Reviews",    value: reviews.length,                                     color:"#C9A84C" },
                  { label:"Pending Approval", value: reviews.filter(r=>!r.featured).length,              color:"#63B3ED" },
                  { label:"Live on Website",  value: reviews.filter(r=> r.featured).length,              color:"#68D391" },
                  { label:"Avg Rating",       value: reviews.length ? (reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1)+"★" : "—", color:"#C9A84C" },
                ].map((s,i) => (
                  <div key={i}>
                    <div className="font-thin mb-1" style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.2rem", color:s.color }}>{s.value}</div>
                    <div className="text-gray-600 uppercase tracking-wider" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {pendingCount > 0 && (
                <div className="mt-5 flex items-center gap-3 px-4 py-3 rounded-lg"
                  style={{ background:"rgba(201,168,76,0.07)", border:"1px solid rgba(201,168,76,0.2)" }}>
                  <span style={{ color:"#C9A84C" }}>⚠</span>
                  <span className="text-yellow-500/70 text-sm">{pendingCount} review{pendingCount>1?"s":""} waiting for approval</span>
                  <button onClick={() => setTab("reviews")} className="ml-auto btn-ghost" style={{ padding:"5px 14px" }}>Review Now</button>
                </div>
              )}
            </div>

            {/* Recent enquiries */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor:"rgba(201,168,76,0.08)" }}>
                <div className="text-gray-500 uppercase tracking-widest" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.58rem" }}>Recent Enquiries</div>
                <button onClick={() => setTab("enquiries")} className="btn-ghost" style={{ padding:"6px 14px" }}>View All</button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-600 border-b uppercase" style={{ borderColor:"rgba(201,168,76,0.08)", fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>
                    {["Guest","Room","Check-in","Status"].map(h => <th key={h} className="text-left px-6 py-3">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {enquiries.slice(0,6).map((e) => (
                    <tr key={e._id} className="data-row border-b transition-colors" style={{ borderColor:"rgba(201,168,76,0.05)" }}>
                      <td className="px-6 py-4">
                        <div className="text-white text-sm">{e.name}</div>
                        <div className="text-gray-600 text-xs">{e.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{e.roomType}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{new Date(e.checkIn).toLocaleDateString("en-IN")}</td>
                      <td className="px-6 py-4"><StatusBadge status={e.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!enquiries.length && <div className="text-center text-gray-700 py-12">No enquiries yet</div>}
            </div>
          </motion.div>
        )}

        {/* ══ ENQUIRIES ══ */}
        {tab === "enquiries" && (
          <motion.div className="p-8 md:p-12"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="tracking-[0.5em] uppercase mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.62rem", color:"rgba(201,168,76,0.5)" }}>Manage</div>
                <h1 className="gold-text font-thin" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.5rem,5vw,4rem)" }}>Enquiries</h1>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[["","All"], ["new","New"], ["contacted","Contacted"], ["resolved","Resolved"]].map(([val, label]) => (
                  <button key={val} onClick={() => setStatusFilter(val)}
                    className="px-4 py-2 rounded-full transition-all"
                    style={{
                      fontFamily:"'Cinzel',serif", fontSize:"0.57rem", letterSpacing:"0.15em",
                      background: statusFilter===val ? "rgba(201,168,76,0.14)" : "transparent",
                      border: `1px solid ${statusFilter===val ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.07)"}`,
                      color: statusFilter===val ? "#C9A84C" : "rgba(255,255,255,0.35)",
                    }}>{label}</button>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-gray-600 uppercase" style={{ borderColor:"rgba(201,168,76,0.1)", fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>
                      {["Guest","Contact","Room","Dates","Guests","Status","Actions"].map(h=>(
                        <th key={h} className="text-left px-5 py-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => (
                      <tr key={e._id} className="data-row border-b transition-colors" style={{ borderColor:"rgba(201,168,76,0.05)" }}>
                        <td className="px-5 py-4">
                          <div className="text-white text-sm font-medium">{e.name}</div>
                          <div className="text-gray-600 text-xs mt-0.5">{new Date(e.createdAt).toLocaleDateString("en-IN")}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-gray-400 text-xs">{e.email}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{e.phone}</div>
                        </td>
                        <td className="px-5 py-4 text-gray-300 text-sm">{e.roomType}</td>
                        <td className="px-5 py-4 text-xs text-gray-500">
                          <div>{new Date(e.checkIn).toLocaleDateString("en-IN")}</div>
                          <div>{new Date(e.checkOut).toLocaleDateString("en-IN")}</div>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-sm">{e.guests}</td>
                        <td className="px-5 py-4"><StatusBadge status={e.status} /></td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2 flex-wrap">
                            <select value={e.status} onChange={(ev) => updateStatus(e._id, ev.target.value)}
                              className="input-gold" style={{ width:"auto", fontSize:"0.72rem", padding:"5px 10px" }}>
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="resolved">Resolved</option>
                            </select>
                            <button onClick={() => setEnquiryDetail(e)} className="btn-ghost" style={{ padding:"5px 12px" }}>View</button>
                            <button onClick={() => deleteEnquiry(e._id)} className="btn-danger" style={{ padding:"5px 10px" }}>Del</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!enquiries.length && <div className="text-center text-gray-700 py-16">No enquiries found</div>}
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ REVIEWS ══ */}
        {tab === "reviews" && (
          <motion.div className="p-8 md:p-12"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="tracking-[0.5em] uppercase mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.62rem", color:"rgba(201,168,76,0.5)" }}>Manage</div>
                <h1 className="gold-text font-thin" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.5rem,5vw,4rem)" }}>Guest Reviews</h1>
                <p className="text-gray-600 text-sm mt-2">Guests submit reviews on the website. Approve them to show on the homepage.</p>
              </div>
              <div className="flex gap-2">
                {[["all","All"], ["pending","Pending"], ["approved","Approved"]].map(([val,label]) => (
                  <button key={val} onClick={() => setReviewFilter(val)}
                    className="px-4 py-2 rounded-full transition-all"
                    style={{
                      fontFamily:"'Cinzel',serif", fontSize:"0.57rem", letterSpacing:"0.15em",
                      background: reviewFilter===val ? "rgba(201,168,76,0.14)" : "transparent",
                      border: `1px solid ${reviewFilter===val ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.07)"}`,
                      color: reviewFilter===val ? "#C9A84C" : "rgba(255,255,255,0.35)",
                    }}>{label} {val==="pending" && pendingCount > 0 ? `(${pendingCount})` : ""}</button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredReviews.map((r) => (
                <motion.div key={r._id} className="glass rounded-2xl p-6 flex flex-col"
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  style={{ borderColor: r.featured ? "rgba(104,211,145,0.2)" : "rgba(201,168,76,0.12)" }}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                        style={{ background:"rgba(201,168,76,0.12)", color:"#C9A84C", fontSize:"1rem" }}>
                        {r.guestName?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{r.guestName}</div>
                        {r.roomType && <div className="text-gray-600 text-xs">{r.roomType}</div>}
                      </div>
                    </div>
                    {/* Status pill */}
                    <span className="px-2.5 py-1 rounded-full text-xs"
                      style={{
                        background: r.featured ? "rgba(104,211,145,0.12)" : "rgba(251,191,36,0.1)",
                        color: r.featured ? "#68D391" : "#FBB724",
                        fontFamily:"'Cinzel',serif", fontSize:"0.5rem", letterSpacing:"0.1em",
                      }}>
                      {r.featured ? "● Live" : "○ Pending"}
                    </span>
                  </div>

                  <Stars rating={r.rating} />
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed flex-1"
                    style={{ fontStyle:"italic" }}>"{r.comment}"</p>
                  <div className="text-gray-700 text-xs mt-3">
                    {new Date(r.createdAt).toLocaleDateString("en-IN")}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {r.featured
                      ? <button onClick={() => toggleFeatured(r._id, r.guestName, true)}  className="btn-hide flex-1">Hide</button>
                      : <button onClick={() => toggleFeatured(r._id, r.guestName, false)} className="btn-approve flex-1">Approve</button>
                    }

                    <button onClick={() => deleteReview(r._id)} className="btn-danger" style={{ padding:"7px 12px" }}>Del</button>
                  </div>
                </motion.div>
              ))}
              {!filteredReviews.length && (
                <div className="col-span-3 text-center text-gray-700 py-20">
                  {reviewFilter==="pending" ? "No pending reviews — all caught up! ✓" : "No reviews yet"}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* ══ ENQUIRY DETAIL MODAL ══ */}
      <AnimatePresence>
        {enquiryDetail && (
          <Modal open={!!enquiryDetail} onClose={() => setEnquiryDetail(null)} title="Enquiry Details">
            <div className="space-y-1 text-sm">
              {[
                ["Name",      enquiryDetail.name],
                ["Email",     enquiryDetail.email],
                ["Phone",     enquiryDetail.phone],
                ["Room",      enquiryDetail.roomType],
                ["Check-in",  new Date(enquiryDetail.checkIn).toDateString()],
                ["Check-out", new Date(enquiryDetail.checkOut).toDateString()],
                ["Guests",    enquiryDetail.guests],
                ["Submitted", new Date(enquiryDetail.createdAt).toLocaleString("en-IN")],
              ].map(([k,v]) => (
                <div key={k} className="flex gap-4 py-2.5 border-b" style={{ borderColor:"rgba(201,168,76,0.07)" }}>
                  <span className="text-gray-600 flex-shrink-0 uppercase" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem", letterSpacing:"0.15em", width:"80px", paddingTop:"2px" }}>{k}</span>
                  <span className="text-gray-200">{v}</span>
                </div>
              ))}
              {enquiryDetail.message && (
                <div className="py-3">
                  <div className="text-gray-600 uppercase mb-2" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem" }}>Message</div>
                  <p className="text-gray-300 leading-relaxed text-sm">{enquiryDetail.message}</p>
                </div>
              )}
              <div className="pt-3 flex gap-3">
                <select value={enquiryDetail.status}
                  onChange={(e) => { updateStatus(enquiryDetail._id, e.target.value); setEnquiryDetail({...enquiryDetail, status:e.target.value}) }}
                  className="input-gold flex-1" style={{ fontSize:"0.8rem" }}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button onClick={() => deleteEnquiry(enquiryDetail._id)} className="btn-danger">Delete</button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>


    </div>
  )
}