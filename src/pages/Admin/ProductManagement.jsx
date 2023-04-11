import React, { useContext, useState } from 'react'
import AuthContext from '../../store/authCtx';
import CreateProduct from '../Product/CreateProduct';

const ProductManagement = () => {
  const authCtx= useContext(AuthContext);
  const [reload, setReload] = useState(true)


  return (
    <section>
      <div className=''>
        <CreateProduct/>
      </div>
      <div className='bg-[#5d7074]'>
Table sản phẩm ở đây
      </div>
    </section>
  )
}

export default ProductManagement