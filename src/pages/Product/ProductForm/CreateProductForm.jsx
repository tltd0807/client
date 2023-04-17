import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, Space, Upload, message,Col, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined,LoadingOutlined } from '@ant-design/icons';
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


const CreateProductForm = ({ open, onCreate, onCancel }) => {
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
    return (
      <Modal
        open={open}
        title="Thêm sản phẩm mới"
        okText="Tạo"
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
          name="createProductForm"
        >
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
      label="Mã sản phẩm"
      name="customeId"
      rules={[
        {
          required: true,
          message: 'Please input customeId!',
        },
      ]}
    >
      <Input />
    </Form.Item></Col>
                <Col span={16}><Form.Item
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
    </Col>
              </Row>

    

    <Form.Item
      label="Mô tả"
      name="description"
    >
      <Input.TextArea  />
    </Form.Item>
    <Row gutter={12}>
      <Col span={8}>
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
    </Col>
    <Col span={5}>
    <Form.Item
      label="Giảm giá"
      name="discount"
      initialValue={0}
    >
      <InputNumber addonAfter="%" min={0}  max={100}/>
    </Form.Item>
    </Col>
  
    <Col span={11}>
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
    </Col>
    </Row>
    <Row>
<Col span={12}>
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
</Col>
<Col span={12}>
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
</Col>
    </Row>
      <Form.List name="inventory" initialValue={[
              { size: null, stock: null },
              { size: null, stock: null },
              { size: null, stock: null },
            ]}>
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
                label='Số lượng'
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
              Thêm cỡ giày và số lượng
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item label="Hình bìa" valuePropName="file" name="imageCover" rules={[
        {
          required: true,
          message: 'Please add image cover for product',
        },
      ]}>
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
              name="images"rules={[
                {
                  required: true,
                  message: 'Please add detail images  for product',
                },
              ]}
              
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
  };
export default CreateProductForm