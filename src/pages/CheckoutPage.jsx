import React from 'react'
import LayoutComponent from '../layout/Layout'

const CheckoutPage = () => {
  return (
    <LayoutComponent>
        <main className='flex justify-center space-x-3'>
            <section>Địa chỉ giao hàng có thể làm như bitis</section>
            <section>Phương thức thanh toán</section>
            <section>Thông tin đơn hàng (voucer ở đây)</section>
        </main>
    </LayoutComponent>
  )
}

export default CheckoutPage