import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import food1 from "../assets/food1.jpg"
import food2 from "../assets/food2.jpg"
import food3 from "../assets/food3.jpg"
import food4 from "../assets/food4.5.jpg"
import food5 from "../assets/food5.jpg"

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
}

const sliderVarient = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  transition: {
    duration: 1
  }
}

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
    <div name="home" className="w-full max-h-[35rem] md:pt-8 px-8">
      <div className="max-w-[1240px] m-auto relative">
        <div onClick={() => prev()} className="absolute text-xl md:text-5xl top-1/2 left-2 md:left-8 -translate-y-1/2 p-4 z-10 bg-[#dc272747] hover:bg-gradient-to-r from-rose-400 to-red-500 hover:scale-105 hover:ease-out duration-100 rounded-full cursor-pointer">
          <BsArrowLeft className="text-white" />
        </div>
        <div onClick={() => next()} className="absolute text-xl md:text-5xl top-1/2 right-2 md:right-8 -translate-y-1/2 p-4 z-10 bg-[#dc272747] hover:bg-gradient-to-r from-rose-400 to-red-500 hover:scale-105 hover:ease-out duration-100 rounded-full cursor-pointer">
          <BsArrowRight className="text-white" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.img
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sliderVarient}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                next()
              } else if (swipe > swipeConfidenceThreshold) {
                prev()
              }
            }}
            key={track}
            src={images[track]}
            alt="food"
            className="w-full h-[20rem] md:h-[30rem] max-h-[30rem] object-cover select-none rounded-xl"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
 
export default Slider;