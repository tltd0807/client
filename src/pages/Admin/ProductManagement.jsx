import React, { useContext, useState } from 'react'
import AuthContext from '../../store/authCtx';
import CreateProduct from '../Product/CreateProduct';

const ProductManagement = () => {
  const authCtx= useContext(AuthContext);



  return (
    <section>
      <div className='py-6'>
        <CreateProduct/>
      </div>
      <div className='bg-[#5d7074]'>
Table sản phẩm ở đây
      </div>
    </section>
  )
}

export default ProductManagement