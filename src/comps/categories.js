import dairy from "../assets/dairy.jpg"
import barbari from "../assets/barbari.jpg"
import deli from "../assets/deli.jpg"
import nuts from "../assets/nuts.jpg"
import fruits from "../assets/fruits.jpg"
import tea from "../assets/tea.jpg"
import sweets from "../assets/sweets.jpg"
import drinks from "../assets/drinks.jpg"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

const Categories = () => {
  return (
    <div className="w-full h-screen px-4">
      {/* Title */}
      <div className="px-8">
        <h1 className="font-semibold text-6xl">Our Categories</h1>
        <div className="mt-4 border-b-4 border-red-200 w-full"></div>
      </div>

      {/* Pics */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-12 my-12">
        <Category pic={dairy} text="Dairy" />
        <Category pic={barbari} text="Bakery" />
        <Category pic={deli} text="Deli" />
        <Category pic={nuts} text="Nuts" />
        <Category pic={fruits} text="Fruits" />
        <Category pic={drinks} text="Drinks" />
        <Category pic={sweets} text="Sweets" />
        <Category pic={tea} text="Tea & Coffee" />
      </div>
    </div>
  );
}

const Category = ({ pic, text }) => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      className="group relative mx-auto"
    >
      <img className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-xl" src={pic} alt="" />
      <AnimatePresence mode="wait">
        {open &&
          <motion.div
            initial={{ opacity: 0, scaleY: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleY: 0, scaleX: 0 }}
            transition={{ duration: .25, type: "tween" }}
            className="absolute flex items-center justify-center origin-bottom-right w-full h-full top-0 z-10 rounded-xl bg-[#900e0e71]">
            
            <h1 className="text-white text-2xl font-semibold">
              { text }
            </h1>
          </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  )
}
 
export default Categories;