import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { FaTrash } from "react-icons/fa"
import Title from "./comps/title"

const DOC = doc(db, "cart", "mohsen")

const Cart = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onSnapshot(DOC, doc => {
      setItems(doc.data()?.cart)
    })
    setLoading(false)

  // eslint-disable-next-line
  }, [])

  const updateCart = (index, math) => {
    setLoading(true)

    setItems(current => 
      current.map((food, i) => {
        if (i === index) {
          switch (math) {
            case "add": // adding amounts
              // all items except the one that is being changed
              let rest = current.filter(item_ => item_ !== food)
              // updating firebase
              setDoc(DOC, {
                cart: arrayUnion({
                  ...food,
                  amount: food.amount + 1,
                }, ...rest)
              })
              .then(() => {
                // updating the state with the new amount
                return {
                  ...food,
                  amount: food.amount + 1,
                }
              })
              break
          
            case "sub": // subtracting amounts
              if (food.amount > 1) {
                // all items except the one that is being changed
                let rest = current.filter(item_ => item_ !== food)
                // updating firebase
                setDoc(DOC, {
                  cart: arrayUnion({
                    ...food,
                    amount: food.amount - 1,
                  }, ...rest)
                })
                .then(() => {
                  // updating the state with the new amount
                  return {
                    ...food,
                    amount: food.amount - 1,
                  }
                })
              }
              break
            default:
              break
          }
        }
        return food
      }
    ))
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  const remove = (index) => {
    updateDoc(DOC, {
      cart: arrayRemove(items[index])
    })
  }

  return (
    <div className="w-full h-full my-32 px-8 max-w-[1240px] mx-auto select-none">
      <Title text="Shopping Cart" />

      {loading ?
        <PlaceHolder />
      :
        (
          items?.length > 0 ? items.map((item, index) => (
          <div className="shadow rounded-xl p-4 h-full w-full flex items-center my-4" key={index}>
            {/* Image */}
            <img className="w-32 h-32 object-cover rounded-xl" src={item?.img} alt="" />

            {/* Name */}
            <h1 className="text-lg capitalize mx-4">{item?.name}</h1>

            {/* Quantity */}
            <div className="flex items-center ml-4 text-xl bg-gray-200 rounded-lg h-10">
              <div className={(item?.amount === 1 ? "text-gray-400" : "cursor-pointer") + " p-1 w-full h-full flex items-center"} onClick={() => item?.amount > 1 && updateCart(index, "sub")}>
                <AiOutlineMinus className="" />
              </div>
              <div className="border-r border-gray-400 h-full"></div>
              <h1 className="mx-6">{item?.amount}</h1>
              <div className="border-r border-gray-400 h-full"></div>
              <div className="p-1 w-full h-full cursor-pointer flex items-center" onClick={() => updateCart(index, "add")}>
                <AiOutlinePlus className="" />
              </div>
            </div>
            <div className="flex items-center ml-4 text-lg cursor-pointer" onClick={() => remove(index)}>
              <FaTrash className="mr-1" />
              Remove
            </div>

            {/* Price */}
            <h1 className="text-2xl font-semibold text-green-500 float-right ml-auto mr-4">${ ((item?.price + .99) * item?.amount).toFixed(2) }</h1>

          </div>
          )) : 
          <div className="text-xl">
            There are no items in your cart.
          </div>
        )
      }
    </div>
  )
}

const PlaceHolder = () => {
  const [numItems, setNumItems] = useState([])

  useEffect(() => {
    const getData = async () => {
      let snapshot = await getDoc(DOC)
      if (snapshot.exists()) {
        setNumItems(Array.apply(null, Array(snapshot.data().cart.length - 1)))
        localStorage.setItem("numItems", snapshot.data().cart.length - 1)
      }
    }; getData()
  }, [])

  return (
    <>
    {numItems.length > 0 && numItems.map((i) => (
      <div className="shadow rounded-xl p-4 h-full w-full flex items-center my-4" key={i}>
        <div className="animate-pulse flex space-x-4 w-full">
          <div className="rounded-xl bg-red-200 w-32 h-32"></div>
          <div className="flex-1 space-y-6 py-1">
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
    ))}
    </>
  )
}
 
export default Cart;