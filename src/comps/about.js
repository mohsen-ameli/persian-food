import { BsArrowDown } from "react-icons/bs"
import { Disclosure } from '@headlessui/react'
import { useState } from "react"

import Title from "./title"

const About = () => {
  return (
    <div name="about" className="w-full h-full my-16 max-w-[1240px] mx-auto px-8">
      {/* Title */}
      <Title text="About Us" />
      
      <div className="mx-auto w-full max-w-4xl p-6 rounded-2xl bg-red-200">
        <MyDisclosure
          title="Want the most delicious food in the world?"
          text="Then order an amazing persian Koobideh Kebab and taste the delicous taste of home. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quis dignissimos consectetur aliquam quos, excepturi fuga doloribus iste maiores quia."  
        />
        <MyDisclosure
          title="Our menues are AWESOME!"
          text="Check out our different stews. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quis dignissimos consectetur aliquam quos, excepturi fuga doloribus iste maiores quia."
        />
        <MyDisclosure
          title="Best customer service in the GTA!"
          text="Amazing workers ready to respond! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quis dignissimos consectetur aliquam quos, excepturi fuga doloribus iste maiores quia."
        />
        <MyDisclosure
          title="Quick and easy orders."
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quis dignissimos consectetur aliquam quos, excepturi fuga doloribus iste maiores quia."
        />
        <MyDisclosure
          title="Fresh out of the box food!"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quis dignissimos consectetur aliquam quos, excepturi fuga doloribus iste maiores quia."
        />
        <MyDisclosure
          title="lorem ipsum dolor sit amet axoo"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quis dignissimos consectetur aliquam quos, excepturi fuga doloribus iste maiores quia."
        />
      </div>
    </div>
  );
}

const MyDisclosure = ({ title, text }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-4">
      <Disclosure>
      <Disclosure.Button
        className="w-full flex items-center justify-between text-md md:text-xl p-4 bg-red-400 rounded-md hover:shadow-xl hover:ease-in-out duration-200"
        onClick={() => setOpen(!open)}
      >
        { title }
        {open
        ? 
          <BsArrowDown className="ml-4 rotate-180 ease-in-out duration-200 text-lg md:text-3xl" />
        :
          <BsArrowDown className="ml-4 rotate-0 ease-in-out duration-200 text-lg md:text-3xl" />
        }
      </Disclosure.Button>
      <Disclosure.Panel className="p-2 w-full text-gray-500">
        { text }
      </Disclosure.Panel>
    </Disclosure>
    </div>
  )
}
 
export default About;