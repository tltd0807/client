import React,{ useState,useEffect } from 'react'
import {  Col, Form, Input, InputNumber, Modal, Row, Select, Upload, message } from 'antd';
import {  PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import { getAllCategory } from '../../../api/productAPI';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
const UpdateProductForm = ({ open, onCreate, onCancel, product }) => {
  // console.log(product)
    const [form] = Form.useForm();
    const [category, setCategory] = useState([])
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
useEffect(() => {
  getAllCategory().then(res=>{
    setCategory(res.data.data)
  }).catch(err=>{
    console.log(err)
  })

}, [])

// useEffect(() => form.resetFields(),[form,product]);
useEffect(() => {
  form.setFieldsValue({
    customeId:product.customeId,
    name:product.name,
    description:product.description,
    price:product.price,
    discount:product.discount,
    color:product.color,
    category:{label: product.category,value:product.categoryId},
    gender:product.gender,
    inventory:[{
      size:product.size,
      stock: product.stock,
    }]
  })
 }, [form, product])

  const categoryOpt=[];
  for(let i=0; i<category.length;i++){
    categoryOpt.push({value:category[i]._id, label:category[i].name })
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handleChangeList = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      )
    );
  };
    // console.log(product)
    return (
      <Modal
        open={open}
        title={`Cập nhật thông tin sản phẩm ${product.customeId} ${product.color}`}
        okText="Cập nhật"
        cancelText="Hủy"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
              setFileList([])
              setImageUrl(null)
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
  <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
      label="Mã sản phẩm"
      name="customeId"
      // initialValue={product.customeId}
    >
      <Input />
    </Form.Item></Col>
                <Col span={16}>
                  <Form.Item
      label="Tên sản phẩm"
      name="name"
      // initialValue={product.name}
    >
      <Input />
    </Form.Item>
    </Col>
              </Row>
          <Form.Item name="description" label="Mô tả " 
          //initialValue={product.description}
           >
            <Input.TextArea />
          </Form.Item>

          <Row gutter={12}>
      <Col span={8}>
    <Form.Item
      label="Giá"
      name="price"
      // initialValue={product.price}
    >
      <InputNumber addonAfter="VNĐ" min={1000}  step={1000}/>
    </Form.Item>
    </Col>
    <Col span={5}>
    <Form.Item
      label="Giảm giá"
      name="discount"
      // initialValue={product.discount}
    >
      <InputNumber addonAfter="%" min={0}  max={100}/>
    </Form.Item>
    </Col>
  
    <Col span={11}>
    <Form.Item
      label="Màu sản phẩm"
      name="color"
      // initialValue={product.color}
    >
      <Input />
    </Form.Item>
    </Col>
    </Row>

    <Row>
<Col span={12}>
<Form.Item
        name="category"
        label="Loại"
        // initialValue={{label: product.category,value:product.categoryId}}
      >
        <Select
          placeholder="Vui lòng chọn loại sản phẩm muốn đổi"
          allowClear
          options={categoryOpt}
        />
  
      </Form.Item>
</Col>
<Col span={12}>
<Form.Item
        name="gender"
        label="Sản phẩm dành cho"
        // initialValue={product.gender}
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
</Col>
    </Row>
    {/*đưa ra stock chỉ cho 1 size kiểm array dạng array form*/}
    <Row gutter={10}>
        <Col md={12} xs={24}>
          <Form.Item
            name={['inventory',0, 'size']}
            label="Size"
            // initialValue={product.size}
          >
            <Input  disabled/>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item name={['inventory',0, 'stock']} label="Số lượng trong kho" 
          // initialValue={product.stock}
          > 
          <InputNumber addonAfter="Đôi" min={0} />
          </Form.Item>
        </Col>
      </Row>
    <Form.Item label="Hình bìa" valuePropName="file" name="imageCover">
    <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={({ onSuccess }) =>
        setTimeout(() => {
          onSuccess("ok", null);
        }, 1000)
      }
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </Form.Item>

    <Form.Item
              label="Hình chi tiết"
              valuePropName="file"
              name="images"
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                showUploadList={{ showPreviewIcon: false }}
                onChange={handleChangeList}
                beforeUpload={beforeUpload}
                customRequest={({ onSuccess }) =>
                  setTimeout(() => {
                    onSuccess("ok", null);
                  }, 100)
                }
              >
                {fileList.length >= 4 ? null : uploadButton}
              </Upload>
            </Form.Item>

        </Form>
      </Modal>
    );
  }

export default UpdateProductForm