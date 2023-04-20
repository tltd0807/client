import React, { useEffect, useState } from 'react'
import LayoutComponent from '../../layout/Layout'
import { getAllProducts } from '../../api/productAPI'
import ProductItem from './ProductItem'



const ProductPage = () => {
const [products, setProducts] = useState([])
useEffect(() => {
    getAllProducts().then(res=>{

        setProducts(res.data.data)
    }).catch(err=>{
        console.log(err.response)
    })


}, [])

        
  return (
    <LayoutComponent>
        <div className='min-h-[300px] bg-[#03045e] flex justify-center items-center w-full'>
            <h1 className=' bg-[#90e0ef] w-full py-7 text-5xl text-[#0077b6] font-bold'>Chào mừng hãy tìm đôi giày phù hợp bạn</h1>
        </div>
    
        <div className='h-10 bg-slate-400'>
                Filter here
            </div>
            <div className='flex flex-wrap justify-center max-w-[100%] gap-4 gap-y-10 mt-10'>
            {products.length!==0&&products.map(product=>(<ProductItem product={product} key={product._id}/>)) }
            </div>

    </LayoutComponent>
  )
}

export default ProductPage