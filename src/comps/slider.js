import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import food1 from "../assets/food1.jpg"
import food2 from "../assets/food2.jpg"
import food3 from "../assets/food3.jpg"
import food4 from "../assets/food4.jpg"
import food5 from "../assets/food5.jpg"

const Slider = () => {
  const images = [
    food1, food2, food3, food4, food5
  ]
  const [track, setTrack] = useState(0)

  const next = () => track < 4  ? setTrack(track + 1) : setTrack(0)
  const prev = () => track > 0 ? setTrack(track - 1) : setTrack(4)

  useEffect(() => {
    setTimeout(() => {
      next()
    }, 3000)
    clearTimeout()
  })

  return (
    <div className="w-full h-full">
      <div onClick={() => prev()} className="absolute top-[60%] left-10 p-4 z-10 bg-[#dc272747] hover:bg-gradient-to-r from-rose-400 to-red-500 hover:scale-105 hover:ease-out duration-100 rounded-full cursor-pointer">
        <BsArrowLeft className="text-white" size={50} />
      </div>
      <div onClick={() => next()} className="absolute top-[60%] right-10 p-4 z-10 bg-[#dc272747] hover:bg-gradient-to-r from-rose-400 to-red-500 hover:scale-105 hover:ease-out duration-100 rounded-full cursor-pointer">
        <BsArrowRight className="text-white" size={50} />
      </div>
      
      <AnimatePresence>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .6 }}
          key={track}
          src={images[track]}
          alt="food"
          className="absolute w-full max-h-[35rem] object-cover select-none"
        />
      </AnimatePresence>
    </div>
  );
}
 
export default Slider;