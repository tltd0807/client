import React,{useState, useEffect} from 'react'
import LayoutComponent from '../../layout/Layout'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAllProductsByDiscount, getAllProductsByGender } from '../../api/productAPI'
import ProductItem from './ProductItem'

const ProductCollection = () => {
const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
   
    const type=searchParams.get("type")
    const navigate= useNavigate();
    useEffect(() => {
        if(!type) navigate('/product')
        if(!(type==='discount'||type==='male'||type==='female')) navigate('/product')
        if(type==='male'||type==='female'){
            getAllProductsByGender(type).then(res=>{
                setProducts(res.data.data)
            }).catch(err=>console.log(err))
        }else{
            getAllProductsByDiscount().then(res=>{
                setProducts(res.data.data)
            }).catch(err=>console.log(err))
        }
    }, [searchParams])


  return (
    <LayoutComponent>
           <h2 className='text-[32px] font-bold my-3 uppercase'>{type==='discount'?"Sản phẩm giá sốc":type==='male'?'Sản phẩm nam':'Sản phẩm nữ'}</h2>
            <div className='h-10 bg-slate-400'>
                Filter here
            </div>
            <div className='flex flex-wrap justify-center max-w-[100%] gap-4 gap-y-10 mt-10'>
                {products.length!==0&&products.map(product=>(<ProductItem product={product} key={product._id}/>)) }
            </div>
    </LayoutComponent>
  )
}

export default ProductCollection