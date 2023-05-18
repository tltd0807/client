import React,{useState, useEffect} from 'react'
import LayoutComponent from '../../layout/Layout'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAllProductsByDiscount, getAllProductsByGender } from '../../api/productAPI'
import ProductItem from './ProductItem'
import { Button, Popover, Slider, Spin } from 'antd'
import ARROW from './../../assets/icon/ChevronDown.svg'
const formatter = (value) => value.toLocaleString('vi', {style : 'currency', currency : 'VND'});
const ProductCollection = () => {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true)
    const [rangePrice, setRangePrice] = useState([0,2000000])
    const [sortBy, setSortBy] = useState('newest')
    const type=searchParams.get("type")
    const navigate= useNavigate();
    useEffect(() => {
        setLoading(true)
        if(!type) navigate('/product')
        if(!(type==='discount'||type==='male'||type==='female')) navigate('/product')
        if(type==='male'||type==='female'){
            getAllProductsByGender(type).then(res=>{
                setProducts(res.data.data)
                setLoading(false)
            }).catch(err=>console.log(err))
        }else{
            getAllProductsByDiscount().then(res=>{
                setProducts(res.data.data)
                setLoading(false)
            }).catch(err=>console.log(err))
        }
    }, [searchParams])

    // làm 2 cái là sort (giá tăng/giảm dần, tên a-z, mới cũ) với filter theo giá
    const onAfterChange = (value) => {
        setRangePrice(value)
      };
      const content = (
        <div>
          <p className='hover:cursor-pointer hover:text-[#48cae4]' onClick={()=>setSortBy('priceUp')}>Giá tăng dần</p>
          <p className='hover:cursor-pointer hover:text-[#48cae4]' onClick={()=>setSortBy('priceDown')}>Giá giảm dần</p>

          <p className='hover:cursor-pointer hover:text-[#48cae4]' onClick={()=>setSortBy('az')}>Tên: A-Z</p>
          <p className='hover:cursor-pointer hover:text-[#48cae4]' onClick={()=>setSortBy('za')}>Tên: Z-A</p>

          <p className='hover:cursor-pointer hover:text-[#48cae4]' onClick={()=>setSortBy('oldest')}>Cũ nhất</p>
          <p className='hover:cursor-pointer hover:text-[#48cae4]' onClick={()=>setSortBy('newest')}>Mới nhất</p>
        </div>
      );

      let sorted =[...products];
      console.log(sorted)

      switch(sortBy){
        case 'priceUp':
            sorted.sort((a, b) =>Math.round((a.price*(1-a.discount/100)/1000)*1000)-Math.round((b.price*(1-b.discount/100)/1000)*1000))
            break;
        case 'priceDown':
            sorted.sort((a, b) =>Math.round((b.price*(1-b.discount/100)/1000)*1000)-Math.round((a.price*(1-a.discount/100)/1000)*1000))
            break;
        case 'az':
            sorted.sort((a, b) =>a.name.localeCompare(b.name))
            break;
        case 'za':
            sorted.sort((a, b) =>b.name.localeCompare(a.name))
            break;
        case 'oldest':
            sorted.sort((a, b) =>Date.parse(a.createAt)-Date.parse(b.createAt))
            break;
        case 'newest':
            sorted.sort((a, b) =>Date.parse(b.createAt)-Date.parse(a.createAt))
            break;
        default: 
            break;

      }
  return (
    <LayoutComponent>
        {loading?<Spin size='large'/>:<> <h2 className='text-[32px] font-bold my-3 uppercase'>{type==='discount'?"Sản phẩm giá sốc":type==='male'?'Sản phẩm nam':'Sản phẩm nữ'}</h2>
            <div className='h-10 ml-[74px] mr-[74px] flex justify-between'>
                <div className='min-w-[400px]'>
                    <p className='font-bold'>Giá từ: {rangePrice[0].toLocaleString('vi', {style : 'currency', currency : 'VND'})} - {rangePrice[1].toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                    <Slider range defaultValue={[0, 2000000]} max={2000000} step={50000} tooltip={{ formatter }} onAfterChange={onAfterChange} />
                </div>
                <div >
                <Popover content={content} title="Title" trigger="hover" placement="bottomRight">
                    <div className='px-3 py-2 border flex w-[170px] justify-between hover:cursor-pointer'>
                    <p>Sắp xếp theo</p>
                    </div>
                    
                </Popover>
                </div>
            </div>
            <div className='flex flex-wrap justify-center max-w-[100%] gap-4 gap-y-10 mt-10'>
                {products.length!==0&&sorted.filter(product=>Math.round((product.price*(1-product.discount/100)/1000)*1000)>=rangePrice[0]&&Math.round((product.price*(1-product.discount/100)/1000)*1000)<=rangePrice[1]).map(product=>(<ProductItem product={product} key={product._id}/>)) }
            </div></>}
          
    </LayoutComponent>
  )
}

export default ProductCollection