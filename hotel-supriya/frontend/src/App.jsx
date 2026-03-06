// import { Routes, Route } from "react-router-dom"

// import Navbar from "./components/Navbar"

// import Home from "./pages/Home"
// import About from "./pages/About"
// import Accommodations from "./pages/Accommodations"
// import Facilities from "./pages/Facilities"
// import Gallery from "./pages/Gallery"
// import Tourism from "./pages/Tourism"
// import AdminDashboard from "./pages/AdminDashboard"

// function App() {
//   return (
//     <>
//       <Navbar />

//       <div className="pt-24">

//         <Routes>

//           <Route path="/" element={<Home />} />

//           <Route path="/about" element={<About />} />

//           <Route path="/accommodations" element={<Accommodations />} />

//           <Route path="/facilities" element={<Facilities />} />

//           <Route path="/gallery" element={<Gallery />} />

//           <Route path="/tourism" element={<Tourism />} />

//           <Route path="/admin" element={<AdminDashboard />} />

//         </Routes>

//       </div>
//     </>
//   )
// }

// export default App


import { Routes, Route, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import About from "./pages/About"
import Accommodations from "./pages/Accommodations"
import Facilities from "./pages/Facilities"
import Gallery from "./pages/Gallery"
import Tourism from "./pages/Tourism"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  const location = useLocation()

  // Home page manages its own full-screen hero, no top padding needed
  const isHome = location.pathname === "/"

  return (
    <>
      <Navbar />

      {/* Only non-home pages get the top padding offset for the fixed navbar */}
      <div className={isHome ? "" : ""}>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/about"          element={<About />} />
          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/facilities"     element={<Facilities />} />
          <Route path="/gallery"        element={<Gallery />} />
          <Route path="/tourism"        element={<Tourism />} />
          <Route path="/admin"          element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default App