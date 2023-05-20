import React, { useEffect, useState } from 'react'
import LayoutComponent from '../layout/Layout'
import COVER1 from './../assets/images/cover/cover1.jpeg'
import COVER2 from './../assets/images/cover/cover2.jpeg'
import COVER3 from './../assets/images/cover/cover3.jpeg'
import { Carousel, Image } from 'antd';
import { Link } from 'react-router-dom'
import { getAllProductsByDiscount, getAllProductsByGender } from '../api/productAPI'
import ProductItem from './Product/ProductItem'
const UserHome = () => {
const [discountProduct, setDiscountProduct] = useState([]);
const [maleProduct, setMaleProduct] = useState([]);
const [femaleProduct, setFemaleProduct] = useState([])

useEffect(() => {
  getAllProductsByGender('male',3).then(res=>{
    // console.log(res)
  setMaleProduct(res.data.data);
  }).catch(err=>{
    console.log(err)
  })
  getAllProductsByGender('female',3).then(res=>{
  setFemaleProduct(res.data.data);
  }).catch(err=>{
    console.log(err.response.data.message)
  })
  getAllProductsByDiscount(3).then(res=>{
    setDiscountProduct(res.data.data);
  }).catch(err=>{
    console.log(err.response.data.message)
  })
}, [])


  return (
    <LayoutComponent>
      <Carousel autoplay>
  
      <Image preview={false} src={COVER1}/>

      <Image preview={false} src={COVER2}/>
 
      <Image preview={false} src={COVER3}/>

      </Carousel>
{/* Tạo thêm page để trình bày với url collection/nam hay collection/nữ hay collection/discount */}

{/* mỗi phần trình bày cỡ 3 sản phẩm  */}
      <div className='w-full min-h-96 my-9 mb-20'>
        <h2 className='text-[32px] font-bold my-3'>Sản phẩm giá sốc</h2>  
        <div className='w-full flex justify-center space-x-10 px-3 mb-5'>
          {
            discountProduct.length>0&&(discountProduct.map(product=>((<ProductItem product={product} key={product._id}/>))))
          }
        </div>
        <Link to={'/collections?type=discount'}><span className='inline-block text-[24px] underline'>Xem thêm</span> </Link>
      </div>

      <div className='w-full min-h-96 my-9 mb-20'>
        <h2 className='text-[32px] font-bold my-3'>Sản phẩm Nam</h2>  
        <div className='w-full flex justify-center space-x-10 px-3 mb-5'>
          {
            maleProduct.length>0&&(maleProduct.map(product=>((<ProductItem product={product} key={product._id}/>))))
          }
        </div>
        <Link to={'/collections?type=male'}><span className='inline-block text-[24px] underline'>Xem thêm</span></Link>
      </div>
      
      <div className='w-full min-h-96 my-9 mb-20'>
        <h2 className='text-[32px] font-bold my-3'>Sản phẩm Nữ</h2>  
        <div className='w-full flex justify-center space-x-10 px-3 mb-5'>
          {
            femaleProduct.length>0&&(femaleProduct.map(product=>((<ProductItem product={product} key={product._id}/>))))
          }
        </div>
        <Link to={'/collections?type=female'}><span className='inline-block text-[24px] underline'>Xem thêm</span></Link>
      </div>
    </LayoutComponent>
  )
}

export default UserHome