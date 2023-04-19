import React, { useContext, useState } from 'react'
import AuthContext from '../../store/authCtx';
import CreateProduct from '../Product/CreateProduct';
import ProductTable from '../Product/ProductTable/ProductTable';

const ProductManagement = () => {
  const authCtx= useContext(AuthContext);



  return (
    <section>
      <div className='py-6'>
        <CreateProduct/>
      </div>
      <div className=''>
      <ProductTable/>
      </div>
    </section>
  )
}

export default ProductManagement