import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {

  const frontend_url = "https://tomato-delivery-frontend-16al.onrender.com"

  try {
    const userId = req.userId
    const { items, amount, address } = req.body

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" })
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address
    })

    await newOrder.save()
    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80
      },
      quantity: item.quantity
    }))

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2 * 100 * 80
      },
      quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })

    res.json({
      success: true,
      success_url: session.url
    })

  } catch (error) {
    console.error("PLACE ORDER ERROR:", error)
    res.json({ success: false, message: "Error" })
  }
}

const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body

    if (!orderId) {
      return res.json({ success: false })
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Order Placed"
      })
    }

    res.json({ success: true })

  } catch (error) {
    console.error("VERIFY ERROR:", error)
    res.json({ success: false })
  }
}


//user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({userId:req.userId})

    res.json({
      success: true,
      data: orders
    })

  } catch (error) {
    console.error("USER ORDERS ERROR:", error)
    res.json({
      success: false,
      message: "Error fetching orders"
    })
  }
}

// Listing orders for admin panel
const listOrders = async (req,res) => {
  try{
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch(error){
    console.log(error);
    res.json({success:false,message:"Error fetching orders"})
  }
}

// api updating oreder status
const updateStatus = async(req,res) =>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Order status updated successfully"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error updating status"})
  }
}

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus }
