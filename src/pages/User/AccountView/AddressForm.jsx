import { Button, Form, Input, Modal } from 'antd'
import React, { useContext } from 'react'
import AuthContext from '../../../store/authCtx';
import { createAddress } from '../../../api/userAPI';
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
const AddressForm = ({setReload}) => {
  const authCtx= useContext(AuthContext)

    const onFinish = (values) => {
        console.log('Success:', values);
        createAddress(authCtx.token,values ).then(res=>{
            success("Thêm thành công")
            setReload(old=>!old)
        }).catch(err=>{
            error(err.response.data.message)
        })
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <>
    <h3 className='text-[18px] font-bold pb-3'>Thêm địa chỉ</h3>
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Tên người nhận"
      name="fullName"
      rules={[
        {
          required: true,
          message: 'Vui lòng thêm tên người nhận!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Số điện thoại"
      name="phoneNo"
      rules={[
        {
          required: true,
          message: 'Vui lòng thêm số điện thoại!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || value.length >=10 ) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Số điện thoại phải có ít nhất 10 chữ số")
            );
          }
        })
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Địa chỉ"
      name="address"
      rules={[
        {
          required: true,
          message: 'Vui lòng thêm địa chỉ',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" className='text-[#48cae4] border border-[#48cae4]'>
        Thêm
      </Button>
    </Form.Item>
  </Form>
  </>
  )
}

export default AddressForm