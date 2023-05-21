import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import LayoutComponent from '../../layout/Layout';
import {  Input, Pagination, Spin } from 'antd';
import ProductItem from './ProductItem';
import { getAllProductsByName } from '../../api/productAPI';
import { pageSize } from '../../configs/constants';
const { Search } = Input;

const ProductSearch = () => {
    const [products, setProducts] = useState([])
    const navigate= useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const productName=searchParams.get("name")
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0);
    const [current, setCurrent] = useState(1);
useEffect(() => {
    setLoading(true)
    if(!productName){
        setProducts([]);
        setLoading(false)
        return;
    }
    getAllProductsByName(productName.trim(),pageSize,current).then(res=>{
        setProducts(res.data.data)
        // setTotalItems(res.totalPage*pageSize)
        // nếu res.result<pageSize thì (res.totalPage-1)*repageSize+res.result
        setTotalItems((res.totalPage-1)*pageSize+res.result)
        setLoading(false)

    }).catch(err=>{
        console.log(err.response.data.message)
        setLoading(false)

    })
}, [productName,current])

  return (
    <LayoutComponent>
        {loading?<Spin size='large'/>:<>
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
            {productName&&<p className='text-[24px]'>Có <span className='font-bold'>{totalItems}</span>  sản phẩm</p>}
            <div className='flex flex-wrap justify-center max-w-[100%] gap-4 gap-y-10 mt-10'>
                {products.length!==0&&products.map(product=>(<ProductItem product={product} key={product._id}/>)) }
            </div>
            {products.length!==0&&<Pagination
                defaultCurrent={current}
                total={totalItems}
                pageSize={pageSize}
                defaultPageSize={pageSize}
                onChange={(page, pageSize) => {
                setCurrent(page);
                }}
            />}</>}

    </LayoutComponent>
  )
}

export default ProductSearch