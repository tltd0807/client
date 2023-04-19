import React, {useState, useEffect, useContext} from 'react'
import { Button, Image, Modal, Space, Table } from "antd";
import { getAllProducts, updateProduct } from '../../../api/productAPI';
import UpdateProductForm from '../ProductForm/UpdateProductForm';
import AuthContext from '../../../store/authCtx';
const success = (mes) => {
  Modal.success({
    title:'SUCCESS',
    content: mes,
    closable:true,
  });
};
const error = (mes) => {
  Modal.error({
    title: "ERROR",
    content: mes,
    closable:true,
  });
};
//   Thiếu category trong table
const ProductTable = () => {
  const authCtx= useContext(AuthContext)
const [data, setData] = useState([])
const [productUpdate, setProductUpdate] = useState()
const [reload, setReload] = useState(false)
const [open, setOpen] = useState(false);
const onCreate = (values) => {
  // cập nhật hình phải cập nhật luôn cả ảnh bìa
console.log('Received values of form: ', values);

  const formData = new FormData();
   if(values.customeId &&values.customeId!==productUpdate.customeId) formData.append("customeId", values.customeId);

  //  if(values.name &&values.name!==productUpdate.name)formData.append("name", values.name);
   formData.append("name", values.name);

   if(values.description&&values.description!==productUpdate.description)formData.append("description", values.description);

   if(values.price &&values.price!==productUpdate.price)formData.append("price", values.price);

   if(values.discount&&values.discount!==productUpdate.discount)formData.append("discount",values.discount );

   formData.append("color", values.color);

    if(values.gender&&values.gender!==productUpdate.gender)formData.append("gender", values.gender);

    if(typeof values.category!=='object')formData.append("category", values.category);
    if(typeof values.category==='object')formData.append("category", values.category.value);

    formData.append('inventory',JSON.stringify(values.inventory))

    if(values.imageCover&&values.images){
      formData.append("imageCover", values.imageCover.file.originFileObj);

      values.images.fileList.forEach((item)=>{
        formData.append('images',item.originFileObj)
      })
}
  setOpen(false);
// gắn API ở đây
updateProduct(authCtx.token,formData, productUpdate.id).then((res) => {
  setReload(old=>!old)
  success("Cập nhật sản phẩm thành công");
})
.catch((err) => {
  error(err.response.data.message);
  console.log(err.response.data.message);
});
};
const columns = [
  {
    title: "Mã sản phẩm",
    dataIndex: "customeId",
    key: "customeId",
  //   width: 120,
    fixed: "left"
  },
  Table.EXPAND_COLUMN,
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
  //   width: 180
  },
  {
      title: "Loại sản phẩm",
      dataIndex: "category",
      key: "category",
      // width: 120
    },
  {
    title: "Tồn kho",
    children: [
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      //   width: 50
      },
      {
        title: "Số lượng trong kho",
        dataIndex: "stock",
        // width: 80
      },
      {
        title: "Đã bán ",
        dataIndex: "soldAmount",
      //   width: 50

      }
    ]
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  //   width: 80,
  },
  {
    title: "Giảm giá %",
    dataIndex: "discount",
    key: "discount",
  //   width: 89,
  },
  {
    title: "Màu",
    dataIndex: "color",
    key: "color"
    // width: 80,
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
  //   width: 80,
  //   fixed: "right"
  },
  {
    title: "Cập nhật",
    key: "update",
    render: (_, record) => (
      <Space size="middle">
        <Button
      type="primary"
      onClick={() => {
        setOpen(true);
        setProductUpdate(record)
      }}
      className='text-[#48cae4] border border-[#48cae4]'
    >
      Cập nhật thông tin
    </Button>
      </Space>
    ),
  }
];
    // key= customeId+ size
    useEffect(() => {
        getAllProducts().then(res=>{
            // console.log(res.data.data)
            const processedData=[]
            res.data.data.forEach(product => {
                product.inventory.forEach(item=>{
                    processedData.push({
                        key:product.customeId+item.size,
                        id:product._id,
                        customeId:product.customeId,
                        name:product.name,
                        price:product.price,
                        description:product.description,
                        discount:product.discount,
                        color:product.color,
                        size:item.size,
                        stock: item.stock,
                        soldAmount: item.soldAmount,
                        gender:product.gender,
                        category:product.category.name,
                        categoryId: product.category.id,
                        imageCover: product.imageCover,
                        images:product.images
                    })
                })
            });
            // console.log(processedData)
            setData(processedData)
            
        }).catch(err=>{
            console.log(err)
        })
    
    }, [reload])
    
  return (
    <>
    {productUpdate&&<UpdateProductForm
    open={open}
    onCreate={onCreate}
    onCancel={() => {
      setOpen(false);
    }}
    product={productUpdate}
    />}
    
    
    <Table
    columns={columns}
    dataSource={data}
    bordered
    size="middle"
    expandable={{
      expandedRowRender: (record) => (
        <div
          style={{
            margin: 0
          }}
        >
            <p className='font-bold'>Mô tả: </p>
          {record.description.split('\\n').map((text,index)=><p key={index}>{text}</p>)}
          {/* Hình ở đây */}
          <div className='flex space-x-5'>
            <div>
            <p className='font-bold'>Hình cover: </p>
          <Image
    width={100}
    src={record.imageCover}
  />
            </div>
           <div>
           <p className='font-bold'>Hình chi tiết: </p>
           {record.images.map((image,index)=>(<Image
           key={index}
    width={100}
    src={image}
  />))}
           </div>
  </div>
        </div>
      )
    }}
    // scroll={{
    //   x: "calc(700px + 50%)",
    //   y: 240
    // }}
  />
  </>)
}

export default ProductTable