import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {

  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const { url } = useContext(StoreContext)
  const navigate = useNavigate()

  const verifyPayment = async () => {
    try {
      await axios.post(`${url}/api/order/verify`, {
        success,
        orderId
      })

      navigate("/myorders")
    } catch (error) {
      console.error(error)
      navigate("/")
    }
  }

  useEffect(() => {
    if (orderId) {
      verifyPayment()
    }
  }, [orderId])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify