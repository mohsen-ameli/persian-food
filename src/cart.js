import { arrayRemove, doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { FaTrash } from "react-icons/fa"
import Title from "./comps/title"
import { useRef } from "react";
import Stripe from "./comps/stripe";

const DOC = doc(db, "cart", "mohsen")

const Cart = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [numItems, setNumItems] = useState([])
  const [total, setTotal] = useState(0)
  
  const pickUp = useRef()
  const delivery = useRef()

  const updateTotal = (array) => {
    let subTotal = 0

    array.map(item => {
      return subTotal += (item.price * item.amount)
    })

    setTotal(subTotal)
  }

  // to update the DB when ser adds or subs an item
  useEffect(() => {
    if (items.length > 0) {
      updateTotal(items)

      setDoc(DOC, {
        cart: items
      }).then(() => {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })
    }
  }, [items])

  // Initial data load
  useEffect(() => {
    onSnapshot(DOC, doc => {
      setItems(doc.data()?.cart)
      updateTotal(doc.data()?.cart)
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

    updateTotal(items)

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
    <div className="w-full h-full px-8 md:p-8 max-w-[1240px] mx-auto select-none">
      <Title text="Shopping Cart" />

      <div className="grid grid-cols-1 md:grid-cols-3 mb-8">
        <div className="col-span-2">
        {numItems.map((z, index) => (
          <div key={index}>
            {loading ? <PlaceHolder /> : (items[index]) && (
              <div className="relative p-4 mb-4 h-full w-full flex md:flex-row flex-col items-center md:space-y-0 space-y-6 md:space-x-4 shadow rounded-xl">
                {/* Image */}
                <img className="w-44 h-44 object-cover rounded-xl" src={items[index]?.img} alt="" />

                {/* Name */}
                <h1 className="text-lg capitalize">{items[index]?.name}</h1>

                <div className="flex items-center space-x-8">
                  {/* Quantity */}
                  <div className="flex items-center md:ml-4 md:my-0 text-xl bg-gray-200 rounded-lg h-10">
                    <div
                      className={(items[index]?.amount === 1 ? "text-gray-400" : "cursor-pointer") + " p-1 w-full h-full flex items-center"}
                      onClick={() => items[index]?.amount > 1 && updateCart(index, "sub")}
                    >
                      <AiOutlineMinus />
                    </div>
                    <div className="border-r border-gray-400 h-full"></div>
                    <h1 className="mx-6">{items[index]?.amount}</h1>
                    <div className="border-r border-gray-400 h-full"></div>
                    <div
                      className="p-1 w-full h-full cursor-pointer flex items-center"
                      onClick={() => updateCart(index, "add")}
                    >
                      <AiOutlinePlus />
                    </div>
                  </div>

                  {/* Remove */}
                  <div className="flex items-center space-x-1 md:ml-4 md:mb-0 text-lg cursor-pointer" onClick={() => remove(index)}>
                    <FaTrash />
                    <span>Remove</span>
                  </div>
                </div>

                {/* Price */}
                <h1 className="md:absolute right-8 text-2xl font-semibold text-green-500">${ (((items[index]?.price) * items[index]?.amount) + .99).toFixed(2) }</h1>
              </div>
            )
            }
          </div>
        ))}
        </div>

        {items.length > 0 && 
          <div className="p-4 md:ml-4 w-full h-fit shadow rounded-xl">
            <h1 className="text-4xl font-semibold">Order Summary</h1>
            <div className="border-b-2 w-full my-4"></div>
            <h1 className="text-lg mb-2">Products: ${ total + .99 }</h1>
            <h1 className="text-lg mb-2">Shipping: Free</h1>
            <h1 className="text-lg mb-2">Taxes: ${ (total * 0.13).toFixed(2) }</h1>
            <div className="border-b-2 w-full my-4"></div>
            <h1 className="text-lg mb-2 font-semibold">Subtotal: ${ (total * 1.13).toFixed(2) }</h1>
            <h1 className="text-lg mt-12 mb-2">Choose how you will recieve your item(s): </h1>
            <div className="flex flex-col items-start">
              <label htmlFor="pickup" className="flex py-2 cursor-pointer w-full">
                <input 
                  type="checkbox"
                  className="mr-2 ml-4 cursor-pointer disabled"
                  onChange={() => delivery.current.checked && (delivery.current.checked = false) }
                  ref={pickUp}
                  id="pickup"
                  name="pickup"
                />
                <label htmlFor="pickup" className="cursor-pointer">I will pick up my items</label>
              </label>
              <label htmlFor="delivery" className="flex py-2 cursor-pointer w-full">
                <input
                  type="checkbox"
                  className="mr-2 ml-4 cursor-pointer"
                  onChange={() => pickUp.current.checked && (pickUp.current.checked = false) }
                  ref={delivery}
                  id="delivery"
                  name="delivery"
                />
                <label htmlFor="delivery" className="cursor-pointer">I'd like my items to be delivered to me</label>
              </label>
            </div>

            <div className="my-6">
              <h1 className="mb-3">Please enter your card information: (fake)</h1>
              <Stripe />
            </div>

            <button className="w-full mt-4 py-2 rounded-lg text-white border-2 border-red-500 bg-red-500 hover:bg-transparent hover:text-black hover:ease-in-out duration-150">
              Checkout
            </button>
          </div>
        }
      </div>
    
      {/* Cart empty */}
      {items.length === 0 && <h1 className="text-2xl">Your cart is currently empty. Please add some products</h1>}
    </div>
  )
}

const PlaceHolder = () => {
  return (
    <div className="shadow rounded-xl px-4 h-full w-full flex items-center mb-4">
      <div className="animate-pulse md:pb-4 pb-16 pt-4 flex md:flex-row flex-col items-center md:space-x-4 w-full">
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