import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./comps/navbar"
import Home from "./home"

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App