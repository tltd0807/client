import React, { useContext, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {loginUser} from '../api/authAPI'
import AuthContext from '../store/authCtx';
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
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);


  const onFinish = (values) => {
    setLoading(true);
    loginUser(values).then((res) => {
      setLoading(false);
      authCtx.login(res.token,res.data.user.firstName,res.data.user.lastName, res.data.user.photo,res.data.user.email, res.data.user.role)
      success("Đăng nhập thành công")
      setTimeout(()=>{
        Modal.destroyAll();
        if(res.data.user.role==='admin'){

          navigate("/admin");
        }else{
          navigate("/");
          
        }
      },1000)

      
    })
    .catch((err) => {
      setLoading(false);
      error( err.response.data.message)
    });
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
      disabled={loading}
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
      <Form.Item
        name="password"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Vui lòng thêm mật khẩu',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value.length >=8 ) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Mật khẩu phải từ 8 ký tự trở lên")
              );
            }
          })
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mật khẩu" />
      </Form.Item>
      <Form.Item>

        <Link className="login-form-forgot" to={'/forgotPassword'}>
        <span className='text-[#1677ff] hover:text-[#1677ffde]'>
          Forgot password</span>
        </Link>
      </Form.Item>

      <Form.Item><Button type="primary" htmlType="submit" className="text-[#48cae4] border border-[#48cae4]">
          Đăng nhập
        </Button>
        
        Chưa có tài khoản? <Link to={'/signup'}><span className='text-[#1677ff] hover:text-[#1677ffde]'> Đăng ký ngay</span></Link>
      </Form.Item>
    </Form></div></main>
  );
}

export default Login