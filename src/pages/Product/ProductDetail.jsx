import React, { useEffect, useState, useContext } from 'react'
import LayoutComponent from '../../layout/Layout'
import {  useParams } from 'react-router-dom';
import { Col, Image, Row ,Badge, Select, Button,Rate, Card, Spin } from 'antd';
import { getAllProductsByNameAndGender, getProductById } from '../../api/productAPI';
import CartCtx from '../../store/cart/CartCtx';

const ProductDetail = () => {
  const { productId } = useParams()
  // Dùng để set hình sản phẩm
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const cartCtx= useContext(CartCtx)
  const [currentProduct, setCurrentProduct] = useState({
    discount:0,
    description:'',
    price:0,
    images:['','','',''], 
    inventory:[
      {
        size:0,
        stock:0
      }
    ]
  })
  const [currentSize, setCurrentSize] = useState(
    {
      size:0,
      stock:0
    }
  )
// console.log(currentProduct)

  useEffect(() => {
    getProductById(productId).then(res=>{
      // console.log(res.data.data)
      setCurrentProduct(res.data.data)
      setLoading(false)
      getAllProductsByNameAndGender(res.data.data.name,res.data.data.gender).then(res=>{
        // console.log(res.data.data)
        setProducts(res.data.data)
      }).catch(err=>console.log(err))
      let i=0;
      while(i<res.data.data.inventory.length){
        if(res.data.data.inventory[i].stock>0){
          setCurrentSize(res.data.data.inventory[i])
          i=res.data.data.inventory.length
        }
        i++;
      }
    
        window.scrollTo(0, 0)
  
    }).catch(err=>console.log(err))


  }, [])
  const handleChange = (value) => {
    setQuantity(value);
  };
  const addToCartHandler=async(currentProduct, size, quantity)=>{

    const existItem=cartCtx.cartItems.find(item=>item.productId===currentProduct._id&&item.size===size);
    const newQuantity= existItem ? existItem.quantity + quantity : 1;
    getProductById(currentProduct._id).then(res=>{
      const product=res.data.data;
      const {stock: stockOfSize}= product.inventory.find(item=>item.size===size)

      if (stockOfSize < newQuantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      cartCtx.addToCart({
        size,
        quantity:newQuantity,
        productId:currentProduct._id, 
        price:currentProduct.price, 
        coverImage:currentProduct.imageCover, productName:currentProduct.name, discount:currentProduct.discount,
        gender:currentProduct.gender,
        customeId:currentProduct.customeId,
        color:currentProduct.color})
    }).catch(err=>{console.log(err)})

  }
const quantityArray=[];
for(let i=1; i<=20&& i<=currentSize.stock; i++) quantityArray.push(i);

  return (
    <LayoutComponent>
      {loading?<Spin size='large'/>:
    <>
    <Row className=''>
      {/* nửa hình bên trái */}
      <Col span={12}>

        <div className='flex justify-end w-full'>

          {currentProduct.discount>0?
          <Badge.Ribbon color="red" placement='start' text={`-${currentProduct.discount}%`}><Image src={currentProduct.imageCover} width={600} alt='Ảnh cover sản phẩm'/></Badge.Ribbon>:
          <Image src={currentProduct.imageCover} width={600} alt='Ảnh cover sản phẩm'/>}
          
        </div>
        <div className='flex justify-end w-full gap-1 mb-1'>

            <Image src={currentProduct.images[0]} width={298} alt='Ảnh cover sản phẩm'/>
  
            <Image src={currentProduct.images[1]} width={298} alt='Ảnh cover sản phẩm'/>
     
        </div>

        <div className='flex justify-end w-full gap-1'>

          <Image src={currentProduct.images[2]} width={298} alt='Ảnh cover sản phẩm'/>

          <Image src={currentProduct.images[3]} width={298} alt='Ảnh cover sản phẩm'/>

        </div>
      
      </Col>
      
{/* nửa thong tin bên phải */}
      <Col span={12}>
            <div className='flex flex-col items-start justify-start w-full gap-1 ml-7 mb-7'>
              <h2 className='text-left text-[32px] max-w-1/2 my-[10px]'>{`${currentProduct.name} ${currentProduct.gender==='male'?'Nam':currentProduct.gender==='female'?'Nữ':''} ${currentProduct.customeId} (${currentProduct.color})`}</h2>
              <div className='flex space-x-2 text-[24px]'> 
                <p className={`${currentProduct.discount===0?'':'line-through'}`}>{currentProduct.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                {currentProduct.discount!==0?<p className='text-[#f50]' >{Math.round((currentProduct.price*(1-currentProduct.discount/100)/1000)*1000).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>:<></>}
              </div>
            </div>
            
            <div className='flex flex-col items-start justify-start w-full gap-1 ml-7 text-[20px]'>
              <p>Tình trạng: {currentSize.stock===0?<span className='text-[#f50] font-bold'>Hết hàng</span>:<span className='text-[#0077b6] font-bold'>Còn hàng ({currentSize.stock})</span>}</p>

              <div className='flex space-x-3 mb-6'>
                {products.map(product=>(
                <div key={product.id} className='w-fit hover:cursor-pointer' onClick={()=>{
                  setCurrentProduct(product);
                  setQuantity(1);
                  let i=0;
                  while(i<product.inventory.length){
                    if(product.inventory[i].stock>0){
                      setCurrentSize(product.inventory[i])
                      i=product.inventory.length
                    }
                    i++;
                  }
                  if(i===product.inventory.length)setCurrentSize({size:0, stock:0})
                }}>
                  <Image width={100} src={product.imageCover} preview={false}/>
                </div>))}

              </div>
              <p>Kích thước:</p>
              <div className='flex max-w-[320px] flex-wrap mb-6'>
                {
                  currentProduct.inventory.map(item=>(
                    <div key={item.size} className={`px-5 py-2 border border-1 border-[#000] ${item.stock===0?'hover:cursor-not-allowed bg-[#edf2f4] text-[#d6ccc2]':' hover:cursor-pointer'} ${item.size===currentSize.size?'bg-[#000] text-[#fff]':''}`} onClick={()=>{
                      if(item.stock===0||item.size===currentSize.size) return;
                      setCurrentSize(item)
                      setQuantity(1);
                    }}>{item.size}</div>
                  ))
                }
              </div>
            </div>
            <div className='flex flex-col items-start justify-start w-full gap-1 ml-7 text-[20px] mb-6'>
            <p>Số lượng:</p>
              <Select
                defaultValue={1}
                style={{
                  width: 120,

                }}
                size='large'
                onChange={handleChange}
                value={quantity}
              >
                {quantityArray.map(i=>(<Select.Option key={i} value={i}>{`${i} đôi`}</Select.Option>))}
            
              </Select>
            </div>

            <div className='flex = justify-start w-full gap-1 ml-7 mb-6'>

            <Button className='w-[320px] bg-[#caf0f8] text-[#003049] border border-[#48cae4] font-bold' size='large' onClick={()=>addToCartHandler(currentProduct,currentSize.size,quantity)}> Thêm vào giỏ hàng</Button>
            </div>
            <div className='flex flex-col items-start justify-start w-full gap-1 ml-7  mb-6'>
              <p className='text-[20px]'>Mô tả:</p>
              <div className='max-w-[350px] text-left'>
              {currentProduct.description.split('\\n').map((text,index)=><p key={index}>{text}</p>)}
              </div>
            </div>
      </Col>
    </Row>
    <br className='border border-1 border-[#000]'/>
    <Row>
      <Col span={8}>
        <div className='flex flex-col items-end justify-start w-full gap-1 ml-7 mb-7'>
          <Card style={{ width: 300 }}>
            <h3 className='text-[24px]'><span>0</span>/5</h3>
            <div>
              <Rate disabled defaultValue={5} />
              <span className='inline-block ml-4 text-[18px]'>0</span>
            </div>
            <div>
              <Rate disabled defaultValue={4} />
              <span className='inline-block ml-4 text-[18px]'>0</span>
            </div> 
            <div>
              <Rate disabled defaultValue={3} />
              <span className='inline-block ml-4 text-[18px]'>0</span>
            </div>
            <div>
              <Rate disabled defaultValue={2} />
              <span className='inline-block ml-4 text-[18px]'>0</span>
            </div>
            <div>
              <Rate disabled defaultValue={1} />
              <span className='inline-block ml-4 text-[18px]'>0</span>
            </div>      
          </Card>
        </div>
      </Col>
      <Col span={16}>Đánh giá</Col>
    </Row>
    </> }
</LayoutComponent>
  )
}

export default ProductDetail

