import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()

    if (!token) {
      alert("Please login to place order")
      return
    }

    let orderItems = []

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id]
        })
      }
    })

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        window.location.href = response.data.success_url
      } else {
        alert("Order failed")
      }
    } catch (error) {
      console.log(error)
      alert("Server error")
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if (!token || getTotalCartAmount() ===0) {
        navigate('/cart')
      }
    },[token, getTotalCartAmount])


  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const total = subtotal + deliveryFee

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder="First Name" />
          <input name="lastName" value={data.lastName} onChange={onChangeHandler} placeholder="Last Name" />
        </div>

        <input name="email" value={data.email} onChange={onChangeHandler} placeholder="Email address" />
        <input name="street" value={data.street} onChange={onChangeHandler} placeholder="Street" />

        <div className="multi-fields">
          <input name="city" value={data.city} onChange={onChangeHandler} placeholder="City" />
          <input name="state" value={data.state} onChange={onChangeHandler} placeholder="State" />
        </div>

        <div className="multi-fields">
          <input name="zipcode" value={data.zipcode} onChange={onChangeHandler} placeholder="Zip Code" />
          <input name="country" value={data.country} onChange={onChangeHandler} placeholder="Country" />
        </div>

        <input name="phone" value={data.phone} onChange={onChangeHandler} placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>${total}</b>
          </div>

          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
