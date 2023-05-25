import {  Image, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { getProductById } from '../../api/productAPI';
import CartCtx from '../../store/cart/CartCtx';
import {
    CloseCircleOutlined
  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const CartItem = ({product,setNOfNotValid,nOfNotValid}) => {
    const navigate=useNavigate();
    const {size, quantity, productId, price, coverImage, productName, discount, gender, customeId, color}=product;
    const quantityArray=[];
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const [productInventory, setProductInventory] = useState({})
    const [isEnoughStock, setIsEnoughStock] = useState(true);
    const cartCtx= useContext(CartCtx)
    useEffect(() => {
        // console.log(`${productName} ${size} running`) 
        if(isEnoughStock){
            return;
        }else if(nOfNotValid.includes(`${productName} ${size}`)){
                // console.log("Co")
                return;
        }else{
                // console.log('no');
                const newArray=[...nOfNotValid,`${productName} ${size}` ];
                setNOfNotValid(newArray)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnoughStock])
    
useEffect(() => {
    getProductById(productId).then(res=>{
        setProductInventory( res.data.data.inventory.find(inventory=>inventory.size===size));

        setIsEnoughStock(res.data.data.inventory.find(inventory=>inventory.size===size).stock>=itemQuantity);
       
    }).catch(err=>console.log(err))
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [itemQuantity])

for(let i=1; i<=20&& i<=productInventory.stock; i++) quantityArray.push(i);

const handleChange = (value) => {
    setItemQuantity(value);
    cartCtx.addToCart({size, productId, price, coverImage, productName, discount, gender, customeId, color, quantity:value})
    
    const newArray=[...nOfNotValid]
    const index = nOfNotValid.indexOf(`${productName} ${size}`);
    if (index > -1) { // only splice array when item is found
        newArray.splice(index, 1); // 2nd parameter means remove one item only
        setNOfNotValid(newArray)
    }
  };
  return (
    <div className={`flex space-x-4 px-5 py-4 ${productInventory.stock===0?'text-[#d6ccc2]':!isEnoughStock?'border-[1px] border-[#ff006e]':''}`}> 
      <Image width={100} preview={false} src={coverImage} className='hover:cursor-pointer ' onClick={()=>navigate(`/product/${productId}`)}/>
        <div>
            <p onClick={()=>navigate(`/product/${productId}`)} className={`w-fit hover:cursor-pointer text-[18px] mb-7 ${productInventory.stock!==0&&!isEnoughStock?'text-[#ff006e]':''}`}>
                {`${productName} ${gender==='male'?'Nam':gender==='female'?'Nữ':''} ${customeId} (${color})`} 
                {productInventory.stock!==0&&!isEnoughStock&&<span className='text-[#ff006e] text-[12px]'>Chọn lại lượng hàng vì kho không đủ</span>}</p>
            <div className='flex space-x-10'>
              <div className=' w-[90px]'>
              {discount>0?<p className='no-underline font-medium'>{Math.round((price*(1-discount/100)/1000)*1000).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>:<></>}

              <p className={`${discount>0?`line-through ${productInventory.stock===0?'text-[#d6ccc2]':'text-[#ff006e]'} `:'font-medium'}`}>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>  

              <div>Kích thước: <span className='font-medium'>{size}</span></div> 
            {
                productInventory.stock===0?<div className='text-[#ff006e] w-[80px] font-bold'>Hết Hàng</div>:<Select
                defaultValue={1}
                style={{
                  width: 80,
                }}
                showArrow={false}
                size='default'
                onChange={handleChange}
                value={itemQuantity}
                status={isEnoughStock?'':"error"}
              >
                {quantityArray.map(i=>(<Select.Option  key={i} value={i}>{`${i} đôi`}</Select.Option>))}
            
              </Select>
            }
              

              <div className='w-[90px] font-bold'>{Math.round((price*(1-discount/100)/1000)*1000*quantity).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>  

                <CloseCircleOutlined className=' hover:cursor-pointer w-[36px] hover:text-[#48cae4] text-[#003049] font-bold'
                onClick={()=>{
                    const newArray=[...nOfNotValid]
                    const index = nOfNotValid.indexOf(`${productName} ${size}`);
                    if (index > -1) { // only splice array when item is found
                        newArray.splice(index, 1); // 2nd parameter means remove one item only
                        setNOfNotValid(newArray)
                    }
                    cartCtx.removeItem({productId, size});
                }}/>
            </div>
  
        </div>

    </div>
  )
}

export default CartItem