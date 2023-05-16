import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../store/authCtx'
import { getAllOrdersAdmin } from '../../api/orderAPI';
import { Button, Table } from 'antd';
const columns=[
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },     
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },      
  {
    title: 'Phương thức thanh toán',
    dataIndex: 'PaymentMethod',
    key: 'PaymentMethod',
  },     
  {
    title: 'Tổng cộng',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },     
  {
    title: 'Trạng thái',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
  }, 
  {
    title: 'Cập nhật trạng thái',
    key: 'updateStatus',
    render: (_, record) => <Button>Cập nhật</Button>,
  },
]
const OrderManagement = () => {
  const authCtx=useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrdersAdmin(authCtx.token).then(res=>{
      setOrders(res.data.data.sort((a,b)=>a.createdAt>b.createdAt?-1:0))
      console.log(res.data.data)
    }).catch(err=>{
      console.log(err.response.data)
      window.alert(err.response.data.message)
    })
  }, [])
  
  return (
    <section>
      <h2 className='text-[24px] my-6 font-bold'>Danh sách đơn hàng</h2>
      <Table columns={columns} bordered/>
    </section>
  )
}

export default OrderManagement