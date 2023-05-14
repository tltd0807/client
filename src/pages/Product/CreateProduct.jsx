import React, { useContext, useState } from 'react'
import { Button, Modal } from 'antd';

import CreateProductForm from './ProductForm/CreateProductForm';
import { createProduct } from '../../api/productAPI';
import AuthContext from '../../store/authCtx';
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
const CreateProduct = (props) => {
  const authCtx= useContext(AuthContext)

const [open, setOpen] = useState(false);
const onCreate = (values) => {
  // console.log('Received values of form: ', values);

  const formData = new FormData();
   formData.append("customeId", values.customeId);
   formData.append("name", values.name);
   if(values.description)formData.append("description", values.description);
   formData.append("price", values.price);
   if(values.discount)formData.append("discount",values.discount );
   formData.append("color", values.color);
   formData.append("gender", values.gender);
   formData.append("category", values.category);
   formData.append("imageCover", values.imageCover.file.originFileObj);
   formData.append('inventory',JSON.stringify(values.inventory))

  values.images.fileList.forEach((item)=>{
    formData.append('images',item.originFileObj)
  })
  setOpen(false);
  createProduct(authCtx.token, formData).then((res) => {
    props.setReload(old=>!old)
    success("Tạo sản phẩm thành công");
  })
  .catch((err) => {
    error(err.response.data.message);
    console.log(err.response.data.message);
  });
};



  return (
    <div className='text-center'>
     <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
        className='text-[#48cae4] border border-[#48cae4]'
      >
        Thêm mới sản phẩm
      </Button>
      <CreateProductForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
  </div>
  )
}

export default CreateProduct
