import React, { useContext, useEffect, useState } from 'react'
import LayoutComponent from '../layout/Layout'
import CartCtx from '../store/cart/CartCtx'
import { Button, Image, Modal, Radio, Select, Space, Spin } from 'antd'
import { getAllVouchers } from '../api/discountAPI'
import AuthContext from '../store/authCtx'
import { deleteAddress, getCurrentUser } from '../api/userAPI'
import AddressItem from './User/AccountView/AddressItem'
import AddressForm from './User/AccountView/AddressForm'
import COD from './../assets/icon/icon_COD.svg'
import PayPal from './../assets/icon/PayPal_Logo2014.svg.png'
import { createOrder } from '../api/orderAPI'
import { useNavigate } from 'react-router-dom'
import { PayPalButtons } from '@paypal/react-paypal-js'
const success = (mes) => {
  Modal.success({
    title:'SUCCESS',
    content: mes,
    closable:true,
  });
};
const error = (mes) => {
  Modal.error({
    title: "ERROR",
    content: mes,
    closable:true,
  });
};
const CheckoutPage = () => {
  const authCtx= useContext(AuthContext)
  const cartCtx = useContext(CartCtx)
  const navigate= useNavigate();
  const [vouchers, setVouchers] = useState([])
  const [reload, setReload] = useState(true)
  const [addressArr, setAddressArr] = useState([{city:''}])
  const [indexArrItem, setIndexArrItem] = useState(0)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [appliedVoucer, setAppliedVoucer] = useState({
    "discount": 0,
    "_id": "",
    "name": "",
    "startDate": "",
    "expireDate": ""
}) 
const { confirm } = Modal;
// console.log(appliedVoucer)
  useEffect(() => {
    getAllVouchers().then(res=>{
      setVouchers(res.data.data)
    }).catch(err=>console.log(err))
    getCurrentUser(authCtx.token).then(res=>{
    setAddressArr(res.data.data.addresses)
  })
  }, [reload])
  const vouchersOptions=vouchers.map(voucher=>{
    return {"label":`${voucher.name} (-${voucher.discount.toLocaleString('vi', {style : 'currency', currency : 'VND'})})`,"value":voucher.name}
   })
const removeAddress=(addressId)=>{
  // console.log('removeAddress: ',addressId)
  showConfirm(authCtx.token, addressId)
}
const showConfirm = ( token,addressId) => {
  confirm({
    title: "XÁC NHẬN",
    content: `Xác nhận xóa địa chỉ?`,
    okText:<span  className="text-[#48cae4] hover:text-white">OK</span>,
    onOk() {
 
      deleteAddress(token, addressId).then(res=>{
        success("Xóa thành công")
        setReload(old=>!old)
      }).catch((err) => {
          console.log(err);
          error(err.response.data.message);
        });
    },
    onCancel() {
      // console.log("cancel");
      return false;
    },
  });
};
// console.log(addressArr[indexArrItem].city==="Thành phố Hồ Chí Minh")
const onChangeRadioHandler = (e) => {
  // console.log('radio checked', e.target.value);
  setPaymentMethod(e.target.value);
};
const createOrderHandler=()=>{
  setLoading(true)
  const orderItems=cartCtx.cartItems.map(item=>{return{
    "color": "Xanh Nhớt",
    "product":item.productId,
    "price":item.price*(1-item.discount/100),
    "size":item.size,
    "quantity":item.quantity
  }})
  // console.log(orderItems)
  if(paymentMethod==="COD"){
    const data=appliedVoucer._id===""?
    {
      orderItems:orderItems,
      shippingPrice:(addressArr[indexArrItem].city==="Thành phố Hồ Chí Minh"?20000:40000),
      address:addressArr[indexArrItem],
      paymentResult: {
        status:false,
        updateTime: new Date(Date.now())
      }}
    :{
      orderItems:cartCtx.cartItems,
      voucher:appliedVoucer._id,
      shippingPrice:(addressArr[indexArrItem].city==="Thành phố Hồ Chí Minh"?20000:40000),
      address:addressArr[indexArrItem],
      paymentResult: {
        status:false,
        updateTime: new Date(Date.now())
      }};
      // console.log(data)
    createOrder(authCtx.token,data).then(res=>{
      setLoading(false)
      window.alert("Đã tạo thành công")
      cartCtx.clearCart();
      navigate(`/order/${res.data.data._id}`)
  
  setLoading(false)
    }).catch(err=>{
  console.log(err.response.data.message);
  setLoading(false);
   window.alert("Lỗi")})
  }else{
    // Paypal taoj thif theem property paymentStatus có status:true nuawx
  }
}
const createOrderPayPal=(data, actions) => {
  return actions.order.create({
      purchase_units: [
          {
              amount: {
                  value:Math.round((cartCtx.cartItems.reduce((total, item)=>total+Math.round((item.price*(1-item.discount/100)/1000)*1000*item.quantity),0)-appliedVoucer.discount+(addressArr[indexArrItem].city==="Thành phố Hồ Chí Minh"?20000:40000))/23000) ,
              },
          },
      ],
  });
}
const onApprovePayPal=(data, actions) => {
  return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      console.log(details)
      window.alert(`Transaction completed by ${name}`);
  });
}
const onError=(err)=>{
  window.alert(err);
}
  return (
    <LayoutComponent>
      {loading?<Spin size="large" />:
        <main className='flex justify-center space-x-3'>
            <section>
              <div className='min-w-[720px] mb-6 '>
                <h2  className='text-[24px] bg-[#f5f5f5] px-2  py-2 uppercase'> Thông tin giao hàng</h2>
                <AddressForm setReload={setReload}/>
                <div className='grid grid-cols-2 gap-2 '>
                      {addressArr.length>0&&addressArr.map((item, index)=>(<div key={item._id} className={`hover:cursor-pointer w-fit rounded-[10px] ${indexArrItem===index?'border-2 border-[#74acfbf3]':''}`} onClick={()=>setIndexArrItem(index)}><AddressItem key={item._id} removeAddress={removeAddress} className={`w-[350px]`}  item={item} setReload={setReload}/></div>))}
                </div>
              </div>
              <div>
              <h2  className='text-[24px] bg-[#f5f5f5] px-2  py-2 uppercase'> Phương thức thanh toán</h2>
              <Radio.Group onChange={onChangeRadioHandler} value={paymentMethod} size={'large'} className='w-full text-left text-[18px] mt-4'>
                <Space direction="vertical" >
                  <Radio value={'COD'}><div className='flex'>Thanh toán trực tiếp khi giao hàng<Image src={COD} alt='cod image' className='ml-3' width={50}/></div> </Radio>
                  <Radio value={'PayPal'}><div className='flex items-center'>Thanh toán trực tuyến<Image src={PayPal} alt='PayPal image' className='ml-3' width={30}/></div></Radio>
                </Space>
              </Radio.Group>
              </div>
            </section>
            <section className='bg-[#f5f5f5] rounded'>
              <h2 className='text-[24px] border-b-2 border-black pb-5 pt-2 uppercase'> tóm tắt Đơn hàng</h2>
              <div>  
                <div className='max-h-[370px]'>
                {cartCtx.cartItems.map(item=>(
                <div key={`${item.productId}-${item.size}`}  className='flex space-x-6 border-b-2 my-4 px-3 '>

                  <Image width={70} preview={false} src={item.coverImage}/>
                  <div className='flex flex-col grow h-full'>
                    <p className='w-fit font-bold'>
                      {`${item.productName} ${item.gender==='male'?'Nam':item.gender==='female'?'Nữ':''} ${item.customeId} (${item.color})`}
                    </p>
                    <p className='text-left '>Kích cỡ: {item.size}</p>
                    <div className=' flex justify-between'>

                      <div className='w-fit flex space-x-1'>
                        <p className={`${item.discount>0?'line-through text-[#d6ccc2]':'font-medium'}`}>{item.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}  
                        </p>
                        {item.discount>0?<p className='no-underline font-medium'>{Math.round((item.price*(1-item.discount/100)/1000)*1000).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>:<></>}

                      </div>
                      <div className='w-fit font-medium '>x {item.quantity}
                      </div>
                    </div>
                  </div>
                  <p className='text-[18px] '>
                    {Math.round((item.price*(1-item.discount/100)/1000)*1000*item.quantity).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                  </p>
                </div>))}
                </div>
              </div>
              {/* VOUCHER HERE */}
              <div className='border-b-2 pb-4 px-2'>
                <div className='flex justify-between font-medium text-[18px] text-[#808080]'>
                  <p>
                      Vouchers:
                  </p>
                  <Select
                    style={{ width: 220 }}
                    options={vouchersOptions}
                    onChange={(value)=>{
                      setAppliedVoucer(vouchers.find(voucher=>voucher.name===value));
                     }}
                  />
                </div>
                
              </div>
              {/* TỔNG HERE */}
              <div className='border-b-2 py-4 px-2'>
                <div className='flex justify-between font-medium text-[18px] text-[#808080]'>
                  <p>
                    Đơn hàng
                  </p>
                  <p className=''>{cartCtx.cartItems.reduce((total, item)=>total+Math.round((item.price*(1-item.discount/100)/1000)*1000*item.quantity),0).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                <div className='flex justify-between font-medium text-[18px] text-[#808080]'>
                  <p>
                    Phí vận chuyển
                  </p>
                  <p className=''>{(addressArr[indexArrItem].city==="Thành phố Hồ Chí Minh"?20000:addressArr[indexArrItem].city!==""?40000:0).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                <div className='flex justify-between font-medium text-[18px] text-[#808080]'>
                  <p>
                    Giảm
                  </p>
                  <p className=''>-{(appliedVoucer.discount).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
              </div>
                {/* SUMMARY */}
              <div className='py-4 px-2'>
              <div className='flex justify-between font-bold text-[20px] '>
                  <p>
                    Tổng cộng
                  </p>
                  <p className='text-[#ff006e]'>{(cartCtx.cartItems.reduce((total, item)=>total+Math.round((item.price*(1-item.discount/100)/1000)*1000*item.quantity),0)-appliedVoucer.discount+(addressArr[indexArrItem].city==="Thành phố Hồ Chí Minh"?20000:40000)).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
              </div>
              {paymentMethod==="COD"?<Button className=' bg-[#caf0f8] text-[#003049] border border-[#48cae4] uppercase font-bold w-full' size='large'  onClick={createOrderHandler}>Hoàn tất đơn hàng</Button>
              :<PayPalButtons createOrder={createOrderPayPal}
              onApprove={onApprovePayPal}
              onError={onError} style={{ layout: "horizontal" }} />}

            </section>
        </main>}
    </LayoutComponent>
  )
}

export default CheckoutPage