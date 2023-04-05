import React from 'react'
import {  UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const ForgotPage = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        //values: {email: 'test@gmail.com'}
      };
  return (
    <main className='w-screen h-screen flex justify-center items-center'>
    <div className='w-1/4 bg-white p-5 rounded-[8px]'>
  <Form
    name="normal_login"
    className="login-form"
    initialValues={{
      remember: false,
    }}
    onFinish={onFinish}
  >
    <Form.Item
      name="email"
      rules={[
        {
          type: "email",
          message: "Vui lòng thêm email hợp lệ"
        },
        {
          required: true,
          message: "Vui lòng thêm email!"
        }
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className="text-[#48cae4] border border-[#48cae4]">
        Gửi
      </Button>
    </Form.Item>
  </Form></div></main>
  )
}

export default ForgotPage