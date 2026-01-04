import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/admin_assets/assets'

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([])

  const getToken = () => localStorage.getItem("token")

  const fetchOrders = async () => {
    try {
      const token = getToken()
      if (!token) {
        toast.error("Admin not logged in")
        return
      }

      const res = await axios.get(`${url}/api/order/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.data.success) {
        setOrders(res.data.data)
      } else {
        toast.error(res.data.message || "Could not fetch orders")
      }
    } catch (error) {
      console.log(error)
      toast.error("Server error")
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const token = getToken()

      const res = await axios.post(
        `${url}/api/order/status`,
        {
          orderId,
          status: event.target.value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res.data.success) {
        toast.success("Order status updated")
        fetchOrders()
      } else {
        toast.error(res.data.message || "Could not update status")
      }
    } catch (error) {
      console.log(error)
      toast.error("Server error")
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="order add">
      <h3>All Orders</h3>

      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="" />

            <div>
              <p className="order-item-food">
                {order.items.map((item, index) =>
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.zipcode}
                </p>
              </div>

              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            <p>Items : {order.items.length}</p>
            <p>Total : ₹{order.amount}</p>

            <select
              value={order.status}
              disabled={order.status === "Delivered"}
              onChange={(event) => statusHandler(event, order._id)}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
