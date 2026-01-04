import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify'

const List = () => {

  const url = "http://localhost:4000"
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error("Error fetching list")
      }
    } catch (error) {
      console.error(error)
      toast.error("Server error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList()
    if(response.data.success){
        toast.success(response.data.message)
    }
    else{
        toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length === 0 && (
          <p style={{ padding: "20px" }}>No food items found</p>
        )}

        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)} className="cursor">❌</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
