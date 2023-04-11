import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, InputNumber, Select, Row, Col, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllCategory } from '../../api/productAPI';



const onFinish = (values) => {
  console.log('Success:', values);
  // Xử lý mấy cái size trc khi gửi xuống BE, thêm xử lý cái discount, xóa những cái undifined
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const CreateProduct = () => {

const [category, setCategory] = useState([])

useEffect(() => {
  getAllCategory().then(res=>{
    setCategory(res.data.data)
  }).catch(err=>{
    console.log(err)
  })

}, [])
  const categoryOpt=[];
  for(let i=0; i<category.length;i++){
    categoryOpt.push({value:category[i]._id, label:category[i].name })
  }



  return (
    <div className='text-left'>
    <Form
    name="basic"
    labelCol={{
      span:8,
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
      label="Tên sản phẩm"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input product name!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Mô tả"
      name="description"
    >
      <Input.TextArea  />
    </Form.Item>
    <Form.Item
      label="Giá"
      name="price"
      rules={[
        {
          required: true,
          message: 'Please input product price!',
        },
      ]}
    >
      <InputNumber addonAfter="VNĐ" min={1000}  step={1000}/>
    </Form.Item>
    <Form.Item
      label="Giảm giá"
      name="discount"
    >
      <InputNumber addonAfter="%" min={5}  max={100}/>
    </Form.Item>
    <Form.Item
      label="Màu sản phẩm"
      name="color"
      rules={[
        {
          required: true,
          message: 'Please input product color!',
        },
      ]}
    >
      <Input />
    </Form.Item>
     <Form.Item
        name="category"
        label="Loại"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Vui lòng chọn loại sản phẩm"
          allowClear
          options={categoryOpt}
        />
  
      </Form.Item>
      
      <Form.Item
        name="gender"
        label="Sản phẩm dành cho"
        rules={[
          {
            required: true,
          },
        ]}
      >
      <Select
          placeholder="Giới tính"
          allowClear
        > 
         <Select.Option value="male">Nam</Select.Option>
         <Select.Option value="female">Nữ</Select.Option>
         <Select.Option value="unisex">Khác</Select.Option>
          </Select>
          </Form.Item>
      <Form.List name="inventory">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
       className=''
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name,'size']}
                label='Size'
                rules={[
                  {
                    required: true,
                    message: 'Missing size',
                  },
                ]}
              >
                <Input placeholder="size" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name,'stock'] }
                label='Stock'
                rules={[
                  {
                    required: true,
                    message: 'Missing stock',
                  },
                ]}
              >
                <InputNumber addonAfter="Đôi" min={0} />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>



    
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
  )
}

export default CreateProduct