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

import Title from "./title"

const Categories = () => {
  return (
    <div name="categories" className="w-full h-full max-w-[1240px] mx-auto px-8 mt-12 mb-16">
      {/* Title */}
      <Title text="Our Categories" />

      {/* Pics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12">
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
  const catVarient = {
    hidden: {
      opacity: 0, scaleY: 0, scaleX: 0
    },
    visible: {
      opacity: 1, scaleY: 1, scaleX: 1, transition: { duration: .25, type: "tween" }
    }
  }

  const [open, setOpen] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      className="group relative mx-auto"
    >
      <img className="w-64 h-64 object-cover rounded-xl shadow-xl" src={pic} alt="" />
      <AnimatePresence mode="wait">
        {open &&
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={catVarient}
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