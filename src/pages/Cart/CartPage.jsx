import React, { useContext } from 'react'
import LayoutComponent from '../../layout/Layout'
import CartCtx from '../../store/cart/CartCtx'

const CartPage = () => {
    const cartCtx = useContext(CartCtx)
    console.log(cartCtx.cartItems)
  return (
    <LayoutComponent>
        <div>CartPage</div>
    </LayoutComponent>
  )
}

export default CartPage