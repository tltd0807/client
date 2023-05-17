import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../store/authCtx'
import { getAllOrdersAdmin } from '../../api/orderAPI';
import { Button, Table, Tag } from 'antd';
import ExpendedOrderTable from '../Order/ExpendedOrderTable';
const columns=[
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render:(_,record)=>(<p>{record.user.email}</p>)
  },     
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render:(_,record)=>(<p>{(new Date(record.createdAt)).toLocaleString('en-GB')}</p>)
  },      
  {
    title: 'Phương thức thanh toán',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
  },     
  {
    title: 'Tổng cộng',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render:(_,record)=>(<p>{(record.totalPrice+record.shippingPrice-(record.voucher?record.voucher.discount:0)).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>)

  },     
  {
    title: 'Trạng thái',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    render:(_,record)=>(<Tag color={record.orderStatus==='done'?"green":record.orderStatus==='fail'?"red":record.orderStatus==='processing'?'blue':"orange"}>{record.orderStatus==='new'?'Chờ xác nhận':record.orderStatus==='processing'?"Dang xử lý":record.orderStatus==='done'?"Hoàn thành":"Đã hủy"}</Tag>)
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
      <Table columns={columns} dataSource={orders} bordered rowKey={record=>record._id}
       expandable={{
        expandedRowRender: (record) => (<ExpendedOrderTable order={record}/>)}}
      />
    </section>
  )
}

export default OrderManagement