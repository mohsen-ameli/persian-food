import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase"
import { arrayUnion, doc, setDoc, onSnapshot } from 'firebase/firestore'

import logo from "../assets/logo.jpg"
import iran from "../assets/iran.svg"
import canada from "../assets/canada.svg"
import DropDown from "./menu";
import { FiLogIn, FiUserPlus, FiShoppingCart } from "react-icons/fi"
import { motion } from "framer-motion";
import { useEffect } from "react";

const Navbar = () => {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") ? localStorage.getItem("lang") : "English")
  const [numItems, setNumItems] = useState(0)

  useEffect(() => {
    onSnapshot(doc(db, "cart", "mohsen"), (doc) => {
      setNumItems(doc.data().cart.length)
    })
  }, [])

  const changeLang = () => {
    if (lang === "English") {
      setLang("Farsi")
      localStorage.setItem("lang", "Farsi")
    } else {
      setLang("English")
      localStorage.setItem("lang", "English")
    }
  }

  return (
    <div className="w-full flex flex-col">
      <nav className="w-full fixed top-0 z-30 bg-red-50 flex items-center justify-center h-[120px] px-4">
        {/* Logo */}
        <div className="p-6">
          <img className="w-24 h-24 rounded-full" src={logo} alt="" />
        </div>

        {/* Search bar */}
        <div className="flex items-center mx-4">
          <input className="border border-gray-400 rounded-md mr-2 px-32 py-2 pl-2" type="text" placeholder="Search For Food" />
          <motion.button 
            className="px-8 py-2 bg-red-400 rounded-md"
            whileHover={{
              scale: 1.05,
              transition: {
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
          >
            Search
          </motion.button>
        </div>
        
        {/* Three buttons */}
        <ul className="flex items-center">
          <motion.li className="relative mx-8 cursor-pointer flex flex-col items-center" whileHover={{
              scale: 1.05,
              transition: {
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}>
              <FiShoppingCart className="text-red-400" size={35} />
              <div className={numItems > 0 ? "w-6 h-5 absolute -top-3 -right-3" : "hidden"}>
                <h1 className="m-auto bg-red-500 rounded-full text-white text-center">{ numItems }</h1>
              </div>
            <span>Cart</span>
          </motion.li>
          <motion.li className="cursor-pointer flex flex-col items-center" whileHover={{
              scale: 1.05,
              transition: {
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}>
            <FiLogIn className="text-red-400" size={35} />
            <span>Login</span>
          </motion.li>
          <motion.li className="mx-8 cursor-pointer flex flex-col items-center" whileHover={{
              scale: 1.05,
              transition: {
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}>
            <FiUserPlus className="text-red-400" size={35} />
            <span>Sign Up</span>
          </motion.li>
          <li className="mx-3 flex items-center cursor-pointer" onClick={() => changeLang()}>
            <img className="w-14 h-8 object-cover mr-2" src={lang === "Farsi" ? iran : canada} alt="" /> {lang}
          </li>
        </ul>
      </nav>

      <nav className="mt-32 h-[50px] text-white flex items-center justify-center bg-red-800">
        <ul className="flex select-none">
          <DropDown />
          <li className="mx-6 hover:text-gray-300">
            <Link to="">
              Home
            </Link>
          </li>
          <li className="mx-6 hover:text-gray-300">
            <Link to="">
              About
            </Link>
          </li>
          <li className="mx-6 hover:text-gray-300">
            <Link to="">
              Categories
            </Link>
          </li>
          <li className="mx-6 hover:text-gray-300">
            <Link to="">
              Products
            </Link>
          </li>
          <li className="mx-6 hover:text-gray-300">
            <Link to="">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
 
export default Navbar;