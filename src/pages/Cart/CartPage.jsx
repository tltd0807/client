import React, { useContext,  useState } from 'react'
import LayoutComponent from '../../layout/Layout'
import CartCtx from '../../store/cart/CartCtx'
import CartItem from './CartItem'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
 
const CartPage = () => {
    const cartCtx = useContext(CartCtx)
    const navigate=useNavigate();
    const [nOfNotValid, setNOfNotValid] = useState([])
    // console.log('nOfNotValid: ',nOfNotValid)
  return (
    <LayoutComponent>
        <main className='flex justify-center space-x-3'>
          <section className='p-2 text-left'>
            <h2 className='text-[24px] border-b-2 pb-5'>Giỏ hàng của bạn</h2>
            <p className='text-[16px] py-5'>Bạn đang có <span className='font-bold'>{cartCtx.cartItems.reduce((total, item)=>total+item.quantity,0)} sản phẩm</span> trong giỏ hàng</p>
            <div className=' rounded border-[1px]'>
              {cartCtx.cartItems.map((item)=>(<CartItem key={item.productId+item.size} product={item} setNOfNotValid={setNOfNotValid} nOfNotValid={nOfNotValid}/>))}
            </div>
          </section>
          <section className='bg-[#f5f5f5] p-2 rounded h-fit w-[350px]'>
          <h2 className='text-[24px] border-b-2 pb-5'>Thông tin đơn hàng</h2>
         
          <div className='flex justify-between py-5'>
            <p className='text-[20px] font-medium'>Tạm tính</p>
            <p className='text-[20px] font-medium text-[#ff006e]'>{cartCtx.cartItems.reduce((total, item)=>total+Math.round((item.price*(1-item.discount/100)/1000)*1000*item.quantity),0).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
          </div>
          <Button className=' bg-[#caf0f8] text-[#003049] border border-[#48cae4] font-bold w-full' size='large' disabled={nOfNotValid.length!==0} onClick={()=>{navigate('/checkout')}}> Đặt hàng</Button>
          </section>

        </main>
    </LayoutComponent>
  )
}

export default CartPage