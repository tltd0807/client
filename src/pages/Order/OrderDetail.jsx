import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import LayoutComponent from '../../layout/Layout'

const OrderDetail = () => {
    const { orderId } = useParams()
    console.log(orderId)
    const [order, setOrder] = useState({})
    useEffect(() => {

    }, [])
    
  return (
    <LayoutComponent>
        <div>OrderDetail</div>
    </LayoutComponent>
    
  )
}

export default OrderDetail