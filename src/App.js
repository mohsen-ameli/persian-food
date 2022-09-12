import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./comps/navbar"
import Slider from "./comps/slider"
import Home from "./home"

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Slider />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App