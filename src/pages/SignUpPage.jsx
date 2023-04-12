import React, { useContext, useState } from 'react'
import {Button,Form, Input, Modal,} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authAPI';
import AuthContext from '../store/authCtx';
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 10
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };
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
 const SignUpPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);


  const onFinish = (values) => {
    setLoading(true);
    registerUser(values).then((res) => {
      setLoading(false);
      authCtx.login(res.token,res.data.user.firstName,res.data.user.lastName, res.data.user.photo,res.data.user.email, res.data.user.role)
      success("Đăng nhập thành công");
      setTimeout(()=>{
        Modal.destroyAll();
        navigate("/");
      },1000)
  
  })
  .catch((err) => {
    setLoading(false);
    error( err.response.data.message)
  });
}

  return (
    <main className='flex justify-center items-center min-h-screen'>
        <div className='bg-white w-fit p-8 rounded-md'>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 700
      }}
      disabled={loading}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
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
        <Input />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="Tên"
        rules={[
          {
            required: true,
            message: "Vui lòng thêm tên của bạn",
            whitespace: true
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Họ"
        rules={[
          {
            required: true,
            message: "Vui lòng thêm họ của bạn",
            whitespace: true
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Vui lòng thêm mật khẩu"
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
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      
      <Form.Item
        name="passwordConfirm"
        label="Xác nhận mật khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng thêm xác nhận mật khẩu"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Mật khẩu và xác nhận không giống")
              );
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className='text-[#48cae4] border border-[#48cae4]'>
          Đăng ký
        </Button>
      </Form.Item>
      Có tài khoản? <Link to={'/login'}><span className='text-[#1677ff] hover:text-[#1677ffde]'> Đăng nhập</span></Link> ngay
    </Form></div></main>
  );
};

export default SignUpPage