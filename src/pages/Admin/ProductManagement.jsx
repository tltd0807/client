import React, {  useState } from 'react'
import CreateProduct from '../Product/CreateProduct';
import ProductTable from '../Product/ProductTable/ProductTable';

const ProductManagement = () => {
const [reload, setReload] = useState(false)


  return (
    <section>
      <div className='py-6'>
        <CreateProduct setReload={setReload}/>
      </div>
      <div className=''>
      <ProductTable reload={reload}/>
      </div>
    </section>
  )
}

export default ProductManagement