import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cart from "./cart"
import Navbar from "./comps/navbar"
import Home from "./home"

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App