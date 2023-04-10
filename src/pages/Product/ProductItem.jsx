import { Card,Tag  } from 'antd'
import React from 'react'
const { Meta } = Card
const ProductItem = ({product}) => {

 
    const productName=(<div><h3 className='text-center text-[24px]'>{`${product.name} ${product.color}`}</h3>
    <p></p>
    </div>)
    const productDescription=(<div>
        <div className='text-[20px] flex justify-between'>
            {product.discount.percent!==0?<p className='text-[#f50]' >{Math.round((product.price*(1-product.discount.percent/100)/1000)*1000).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>:<></>}
            <div className='flex space-x-3 '>
                <p className={`${product.discount.percent===0?'':'line-through'}`}>{product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
         
                {product.discount.percent!==0?<Tag color='red' ><span className='text-[18px] translate-y-6'>{'- '+ product.discount.percent+'%'}</span></Tag>:<></>}</div>
            </div>
        <div></div>
    </div>)
  return (
    <div className='w-[30%] mx-0' onClick={()=>{console.log("product._id: ",product._id)}}>
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