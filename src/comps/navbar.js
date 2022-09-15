import { useState } from "react";
import { Link as Scroll } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase"
import { doc, onSnapshot } from 'firebase/firestore'

import logo from "../assets/logo.jpg"
import iran from "../assets/iran.svg"
import canada from "../assets/canada.svg"
import DropDown from "./menu";
import { FiLogIn, FiUserPlus, FiShoppingCart } from "react-icons/fi"
import { BsList } from "react-icons/bs"
import { GrClose } from "react-icons/gr"
import { motion } from "framer-motion";
import { useEffect } from "react";

const Navbar = () => {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") ? localStorage.getItem("lang") : "English")
  const [numItems, setNumItems] = useState(0)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    onSnapshot(doc(db, "cart", "mohsen"), (doc) => {
      setNumItems(doc.data().cart.length)
    })
  }, [])

  const changeLang = () => {
    if (lang === "English") {
      setLang("فارسی")
      localStorage.setItem("lang", "فارسی")
    } else {
      setLang("English")
      localStorage.setItem("lang", "English")
    }
  }

  return (
    <div className="w-full flex flex-col mb-[180px]">
      {/* First Navbar */}
      <nav className="w-full fixed top-0 z-20 px-2 md:px-8 bg-[#ffeded] flex items-center justify-center h-[130px] select-none shadow-lg">
        {/* Hamburger Icon */}
        <div className="md:hidden mr-4 p-2 cursor-pointer border rounded-2xl" onClick={() => setOpen(!open)}>
          <BsList size={35} />
        </div>
        
        {/* Logo */}
        <Link to="">
          <img className="w-24 h-auto rounded-full" src={logo} alt="" />
        </Link>

        {/* Search bar */}
        <div className="hidden md:flex items-center mx-4">
          <input className="border border-gray-400 rounded-md mr-2 pr-8 lg:pr-32 py-2 pl-2" type="text" placeholder="Search For Food" />
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
        <ul className="flex items-center ml-4 text-center">
          {/* Cart */}
          <TopNavItem>
            <Link to="/cart">
              <FiShoppingCart className="text-red-400" size={35} />
              <div className={numItems > 0 ? "w-6 h-5 absolute -top-3 -right-3" : "hidden"}>
                <h1 className="bg-red-500 rounded-full text-white text-center">{ numItems }</h1>
              </div>
              <span className="sm:block hidden">Cart</span>
            </Link>
          </TopNavItem>

          {/* Login */}
          <TopNavItem>
            <FiLogIn className="text-red-400" size={35} />
            <span className="sm:block hidden">Login</span>
          </TopNavItem>

          {/* SignUp */}
          <TopNavItem>
            <FiUserPlus className="text-red-400" size={35} />
            <span className="sm:block hidden">Sign Up</span>
          </TopNavItem>

          {/* Language */}
          <TopNavItem onClick={() => changeLang()}>
            <img className="w-14 object-cover" src={lang === "فارسی" ? iran : canada} alt="" />
            <span className="sm:block hidden">{ lang }</span>
          </TopNavItem>
        </ul>
      </nav>

      {/* Mobile Navbar */}
      {open && 
        <nav className="md:hidden w-full h-screen z-30 bg-gray-400 fixed top-0 left-0">
          <div className="w-fit my-10 mx-2 p-2 cursor-pointer border rounded-2xl" onClick={() => setOpen(!open)}>
            <GrClose size={35} />
          </div>

          <ul className="flex flex-col select-none">
            {/* <DropDown /> */}
            <li className="px-6 py-8 text-4xl text-center font-semibold cursor-pointer">
              <Scroll onClickCapture={() => navigate("/")} to="home" smooth={true} offset={-300} onClick={() => setOpen(!open)}>
                Home
              </Scroll>
            </li>
            <li className="px-6 py-8 text-4xl text-center font-semibold cursor-pointer">
              <Scroll onClickCapture={() => navigate("/")} to="categories" smooth={true} offset={-160} onClick={() => setOpen(!open)}>
                Categories
              </Scroll>
            </li>
            <li className="px-6 py-8 text-4xl text-center font-semibold cursor-pointer">
              <Scroll onClickCapture={() => navigate("/")} to="products" smooth={true} offset={-160} onClick={() => setOpen(!open)}>
                Products
              </Scroll>
            </li>
            <li className="px-6 py-8 text-4xl text-center font-semibold cursor-pointer">
              <Scroll onClickCapture={() => navigate("/")} to="about" smooth={true} offset={-160} onClick={() => setOpen(!open)}>
                About
              </Scroll>
            </li>
          </ul>          
        </nav>
      }

      {/* Second Navbar */}
      <nav className="hidden mt-32 w-full h-[50px] fixed top-0 z-30 text-white md:flex items-center justify-center bg-red-800 shadow-2xl">
        <ul className="flex select-none">
          <DropDown />
          <li className="mx-6 hover:text-gray-300 cursor-pointer">
            <Scroll
              onClickCapture={() => navigate("/")}
              to="home"
              smooth={true}
              offset={-300}
            >
              Home
            </Scroll>
          </li>
          <li className="mx-6 hover:text-gray-300 cursor-pointer">
            <Scroll
              onClickCapture={() => navigate("/")}
              to="about"
              smooth={true}
              offset={-190}
            >
              About
            </Scroll>
          </li>
          <li className="mx-6 hover:text-gray-300 cursor-pointer">
            <Scroll
              onClickCapture={() => navigate("/")}
              to="categories"
              smooth={true}
              offset={-190}
            >
              Categories
            </Scroll>
          </li>
          <li className="mx-6 hover:text-gray-300 cursor-pointer">
            <Scroll
              onClickCapture={() => navigate("/")}
              to="products"
              smooth={true}
              offset={-190}
            >
              Products
            </Scroll>
          </li>
          {/* <li className="mx-6 hover:text-gray-300 cursor-pointer">
            <Scroll
              onClickCapture={() => navigate("/")}
              to="">
              Contact
            </Scroll>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

const TopNavItem = ({ children, ...rest }) => {
  const navVarient = {
    hover: {
      scale: 1.05,
      transition: {
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  }
  
  return (
    <motion.li
      className="flex flex-col items-center mr-4 w-max h-max md:mx-6 cursor-pointer"
      whileHover="hover"
      variants={navVarient}
      {...rest}
    >
      {children}
    </motion.li>
  )
}
 
export default Navbar;