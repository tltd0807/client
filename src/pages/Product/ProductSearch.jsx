import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import LayoutComponent from '../../layout/Layout';
import {  Input } from 'antd';
import ProductItem from './ProductItem';
import { getAllProductsByName } from '../../api/productAPI';
const { Search } = Input;

const ProductSearch = () => {
    const [products, setProducts] = useState([])
    const navigate= useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const productName=searchParams.get("name")
useEffect(() => {
    if(!productName){
        setProducts([]);
        return;
    }
    getAllProductsByName(productName).then(res=>{
        setProducts(res.data.data)
    }).catch(err=>{
        console.log(err.response.data.message)
    })
}, [productName])

  return (
    <LayoutComponent>
           <h2 className='text-[32px] font-bold my-3 uppercase'>Tìm kiếm </h2>
           {products.length===0&&(<div className=' flex flex-col space-y-10 text-[24px] leading-10'>
            <div>
                <p>Rất tiếc, chúng tôi không tìm thấy kết quả cho từ khóa của bạn</p>
                <p>Vui lòng kiểm tra chính tả, sử dụng các từ tổng quát hơn và thử lại!</p>
            </div>
            <div className='w-1/3 mx-auto'>
                <Search placeholder="Tìm kiếm " loading={false} enterButton size='large' className='w-[350px]' onSearch={(value)=>{
                    if(!value) return;
                    navigate(`/search?name=${value}`)
                }}/>
            </div>
            
            </div>)}
            {productName&&<p className='text-[24px]'>Có <span className='font-bold'>{products.length}</span>  sản phẩm</p>}
            <div className='flex flex-wrap justify-center max-w-[100%] gap-4 gap-y-10 mt-10'>
                {products.length!==0&&products.map(product=>(<ProductItem product={product} key={product._id}/>)) }
            </div>
    </LayoutComponent>
  )
}

export default ProductSearch