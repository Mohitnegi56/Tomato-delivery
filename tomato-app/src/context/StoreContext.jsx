import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {

  const url = "https://tomato-delivery-backend-q5bh.onrender.com"

  const [food_list, setFoodList] = useState([])
  const [cartItems, setCartItems] = useState({})
  
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setFoodList(response.data.data)
    }
  }

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setCartItems(response.data.cartData || {})
  }

  useEffect(() => {
    fetchFoodList()
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
      loadCartData(token)
    } else {
      localStorage.removeItem("token")
      setCartItems({})
    }
  }, [token])

  const addToCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))

    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems(prev => {
      if (!prev[itemId]) return prev
      const updated = { ...prev }
      updated[itemId] -= 1
      if (updated[itemId] <= 0) delete updated[itemId]
      return updated
    })

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    if (!cartItems || !food_list.length) return 0

    for (const item in cartItems) {
      const itemInfo = food_list.find(p => p._id === item)
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item]
      }
    }
    return totalAmount
  }

  return (
    <StoreContext.Provider value={{
      food_list,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
