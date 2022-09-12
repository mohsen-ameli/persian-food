import { db } from "../firebase"
import { arrayUnion, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'

import koobideh from "../assets/koobideh.jpg"
import { useEffect } from "react"
import { useState } from "react"

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
    for (let i = 0; i < 10; i++) {
      setPrices()
      fetchStuff()
    }
  }, [])

  const addToCart = async () => {
    await setDoc(doc(db, "cart", "mohsen"), {
      cart: arrayUnion({
        name: "hello",
        img: "https://google.com/",
        price: 15123
      })
    }, { merge: true })
  }

  return (
    <div className="w-full h-full py-40">
      {/* Title */}
      <div className="px-8">
        <h1 className="font-semibold text-6xl">Our Products</h1>
        <div className="mt-4 border-b-4 border-red-200 w-full"></div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 m-4 mt-12">
        {products && products.map((product, i) => (
          <div className="flex flex-col items-center" onClick={addToCart}>
            <img className="w-64 h-64 object-cover rounded-md shadow-xl" src={product} alt="" />
            {
            <div className="flex items-center mt-4">
              <h1 className="text-3xl font-semibold text-green-600">${ discount[i] }</h1>
              <h1 className="text-lg font-semibold ml-2 text-gray-600 line-through">${ price[i] }</h1>
            </div>
            }
            { Math.round((100 - discount[i] / price[i] * 100) / 5) * 5 > 0 &&
              <h1 className="text-md text-red-600">{ Math.round((100 - discount[i] / price[i] * 100) / 5) * 5  }% OFF</h1>
            }
            <h1 className="text-2xl mt-1 capitalize">{ product.split("images/")[1].split("/")[0] }</h1>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Products;