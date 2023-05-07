import React, { useContext, useEffect, useState } from 'react'
import LayoutComponent from '../../layout/Layout'
import CartCtx from '../../store/cart/CartCtx'
import CartItem from './CartItem'
 
const CartPage = () => {
    const cartCtx = useContext(CartCtx)

    const [nOfNotValid, setNOfNotValid] = useState([])
    console.log('nOfNotValid: ',nOfNotValid)
    // nOfNotValid.length===0 thif able nut checkout len
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
          <section className='bg-[#f5f5f5]'>
            <h2 className='text-[20px]'>Thông tin đơn hàng</h2>
            {/* <p>{isValid?'false':'true'}</p> */}
          </section>

        </main>
    </LayoutComponent>
  )
}

export default CartPage