import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import food1 from "../assets/food1.jpg"
import food2 from "../assets/food2.jpg"
import food3 from "../assets/food3.jpg"
import food4 from "../assets/food4.5.jpg"
import food5 from "../assets/food5.jpg"

const Slider = () => {
  const INTERVAL_TIME = 5000
  const images = [food1, food2, food3, food4, food5]
  const [track, setTrack] = useState(0)

  const next = () => track < images.length - 1  ? setTrack(track + 1) : setTrack(0)
  const prev = () => track > 0 ? setTrack(track - 1) : setTrack(images.length - 1)

  useEffect(() => {
    const interval = setInterval(() => next(), INTERVAL_TIME)

    return () => clearInterval(interval)
  })

  return (
    <div className="w-full h-full max-w-[1240px] m-auto mt-16 px-8 relative">
      <div onClick={() => prev()} className="absolute text-2xl md:text-5xl top-1/2 left-16 p-4 z-10 bg-[#dc272747] hover:bg-gradient-to-r from-rose-400 to-red-500 hover:scale-105 hover:ease-out duration-100 rounded-full cursor-pointer">
        <BsArrowLeft className="text-white" />
      </div>
      <div onClick={() => next()} className="absolute text-2xl md:text-5xl top-1/2 right-16 p-4 z-10 bg-[#dc272747] hover:bg-gradient-to-r from-rose-400 to-red-500 hover:scale-105 hover:ease-out duration-100 rounded-full cursor-pointer">
        <BsArrowRight className="text-white" />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .6 }}
          key={track}
          src={images[track]}
          alt="food"
          className="w-full max-h-[30rem] object-cover select-none rounded-b-xl"
        />
      </AnimatePresence>
    </div>
  );
}
 
export default Slider;