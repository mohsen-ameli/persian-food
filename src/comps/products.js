import { db } from "../firebase"
import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { AnimatePresence, motion } from "framer-motion"
import { BsCartPlusFill } from "react-icons/bs"
import { useEffect, useState } from "react"

import Title from "./title"

const Products = () => {
  const [products, setProducts] = useState([])
  const [price, setPrice] = useState([])
  const [discount, setDiscount] = useState([])

  useEffect(() => {
    const fetchStuff = async () => {
      const res = await fetch("https://foodish-api.herokuapp.com/api")
      if (res.ok) {
        const data = await res.json()
        setProducts(old => [...old, data.image])
      }
    }
    const setPrices = () => {
      let price_ = Math.floor(Math.random() * (90)) + 11
      let discount_ = Math.floor(Math.random() * (price_ - 10 + 1)) + 10

      setPrice(old => [...old, price_])
      setDiscount(old => [...old, discount_])
    }
    for (let i = 0; i < 2; i++) {
      setPrices()
      fetchStuff()
    }
  }, [])

  const addToCart = async (product, index) => {
    await setDoc(doc(db, "cart", "mohsen"), {
      cart: arrayUnion({
        amount: 1,
        name: product.split("images/")[1].split("/")[0],
        img: product,
        price: discount[index]
      })
    }, { merge: true })
  }

  return (
    <div className="w-full h-full px-8 max-w-[1240px] mx-auto">
      {/* Title */}
      <Title text="Our Products" />

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 m-4">
        {products && products.map((product, index) => (
          <div className="flex flex-col items-center" key={index}>
            <Product pic={product} onClick={() => addToCart(product, index)} />
            {
            <div className="flex items-center mt-4">
              <h1 className="text-3xl font-semibold text-green-600">${ (discount[index] + .99).toFixed(2) }</h1>
              <h1 className="text-lg font-semibold ml-2 text-gray-600 line-through">${ (price[index] + .99).toFixed(2) }</h1>
            </div>
            }
            { Math.round((100 - discount[index] / price[index] * 100) / 5) * 5 > 0 &&
              <h1 className="text-md text-red-600">{ Math.round((100 - discount[index] / price[index] * 100) / 5) * 5  }% OFF</h1>
            }
            <h1 className="text-2xl mt-1 capitalize">{ product.split("images/")[1].split("/")[0] }</h1>
          </div>
        ))
        }
      </div>
    </div>
  )
}

const Product = ({ pic, ...rest }) => {
  const proVarient = {
    hidden: {
      opacity: 0, scaleY: 0, scaleX: 0, rotate: 0
    },
    visible: {
      opacity: 1, scaleY: 1, scaleX: 1, rotate: 90
    },
    transition: { duration: .5, type: "spring" }
  }
  
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      className="group relative mx-auto cursor-pointer"
      {...rest}
    >
      <img className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-md shadow-xl" src={pic} alt="" />
      <AnimatePresence mode="wait">
        {open &&
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition="transition"
            variants={proVarient}
            className="absolute flex items-center justify-center origin-center w-full h-full top-0 z-10 rounded-md bg-[#900e0e71]">
            
            <BsCartPlusFill className="-rotate-90" color="white" size={50} />
          </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  )
}

export default Products;