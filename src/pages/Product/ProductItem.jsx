import { Card,Tag  } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
const { Meta } = Card
const ProductItem = ({product}) => {
  const navigate = useNavigate();

 
    const productName=(<div><h3 className='text-center text-[24px]'>{`${product.name} ${product.gender==='male'?'Nam':product.gender==='female'?'Nữ':''} ${product.customeId} (${product.color})`}</h3>
    <p></p>
    </div>)
    const productDescription=(<div>
        <div className='text-[20px] flex justify-between'>
        <div className='flex space-x-3 '>
            {product.discount!==0?<p className='text-[#f50]' >{Math.round((product.price*(1-product.discount/100)/1000)*1000).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>:<></>}
            <p className={`${product.discount===0?'':'line-through'}`}>{product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>

            </div>
         
                {product.discount!==0?<Tag color='red' ><span className='text-[18px] translate-y-6'>{'- '+ product.discount+'%'}</span></Tag>:<></>}</div>


    </div>)
    
  return (
    <div className='w-[30%] mx-0' onClick={()=>{
      navigate(`/product/${product._id}`,{ state: {product } })
      // console.log("product._id: ",product._id)
      }}>
    <Card
    hoverable
    // style={{ width: '30%', margin:"0px" }}
    cover={<img alt="example" src={product.imageCover} />}
  >
    <Meta className='text-left' title={productName} description={productDescription} />

  </Card></div>
  )
}

export default ProductItem