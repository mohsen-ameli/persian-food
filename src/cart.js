import { arrayRemove, doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { FaTrash } from "react-icons/fa"
import Title from "./comps/title"

const DOC = doc(db, "cart", "mohsen")

const Cart = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [numItems, setNumItems] = useState([])

  // to update the DB when ser adds or subs an item
  useEffect(() => {
    if (items.length > 0) {
      setDoc(DOC, {
        cart: items
      }).then(() => {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })
    }
  }, [items])

  useEffect(() => {
    onSnapshot(DOC, doc => {
      setItems(doc.data()?.cart)
    })

    const getData = async () => {
      let snapshot = await getDoc(DOC)
      if (snapshot.exists()) {
        setNumItems(Array.from(Array(snapshot.data().cart.length)))
      }
    }; getData()

    setLoading(false)

  // eslint-disable-next-line
  }, [])

  const updateCart = (index, math) => {
    setLoading(true)

    setItems(current =>  current.map((food, i) => {
      if (i === index) {
        switch (math) {
          case "add":
            return {
              ...food,
              amount: food.amount + 1,
            }
        
          case "sub":
            if (food.amount > 1) {
              return {
                ...food,
                amount: food.amount - 1,
              }
            }
            break
          default:
            break
        }
      }
      return food
    }))
  }

  const remove = async (index) => {
    setLoading(true)

    await setDoc(DOC, {
      cart: arrayRemove(items[index])
    })
    setItems(current => current.filter(item => item !== items[index]))
    setLoading(false)
  }

  return (
    <div className="w-full h-full my-16 px-8 max-w-[1240px] mx-auto select-none">
      <Title text="Shopping Cart" />

      {items.length === 0 && <h1 className="text-2xl">Your cart is currently empty. Please add some products</h1>}
      
      {numItems.map((z, index) => (
        <div key={index}>
          {loading ? <PlaceHolder /> : (items[index]) && (
            <div className="shadow rounded-xl p-4 h-full w-full flex md:flex-row flex-col items-center my-4">
              {/* Image */}
              <img className="w-44 h-44 object-cover rounded-xl" src={items[index]?.img} alt="" />

              {/* Name */}
              <h1 className="text-lg capitalize mx-4 mt-4 md:mt-0">{items[index]?.name}</h1>

              {/* Quantity */}
              <div className="flex items-center md:ml-4 my-4 md:my-0 text-xl bg-gray-200 rounded-lg h-10">
                <div
                  className={(items[index]?.amount === 1 ? "text-gray-400" : "cursor-pointer") + " p-1 w-full h-full flex items-center"}
                  onClick={() => items[index]?.amount > 1 && updateCart(index, "sub")}
                >
                  <AiOutlineMinus className="" />
                </div>
                <div className="border-r border-gray-400 h-full"></div>
                <h1 className="mx-6">{items[index]?.amount}</h1>
                <div className="border-r border-gray-400 h-full"></div>
                <div
                  className="p-1 w-full h-full cursor-pointer flex items-center"
                  onClick={() => updateCart(index, "add")}
                >
                  <AiOutlinePlus className="" />
                </div>
              </div>

              {/* Remove */}
              <div className="flex items-center md:ml-4 mb-4 md:mb-0 text-lg cursor-pointer" onClick={() => remove(index)}>
                <FaTrash className="mr-1" />
                Remove
              </div>

              {/* Price */}
              <h1 className="text-2xl font-semibold text-green-500 float-right md:ml-auto md:mr-4">${ ((items[index]?.price + .99) * items[index]?.amount).toFixed(2) }</h1>
            </div>
          )
          }
        </div>
      ))
      }
    </div>
  )
}

const PlaceHolder = () => {
  return (
    <div className="shadow rounded-xl px-4 h-full w-full flex items-center my-4">
      <div className="animate-pulse md:pb-4 pb-28 pt-4 flex md:flex-row flex-col items-center md:space-x-4 w-full">
        <div className="rounded-xl bg-red-200 w-44 h-44 md:mb-0 mb-8"></div>
        <div className="flex-1 space-y-6 py-1 w-full">
          <div className="h-2 bg-red-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-red-200 rounded col-span-2"></div>
              <div className="h-2 bg-red-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-red-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Cart;