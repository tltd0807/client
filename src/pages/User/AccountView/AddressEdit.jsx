import React from 'react'
import {  Form, Input, Modal } from 'antd';


const AddressEdit = ({ open, onCreate, onCancel, item }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="Cập nhật thông tin địa chỉ"
        okText="Cập nhật"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
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
          <Form.Item
            name="fullName"
            label="Tên người nhận"
            initialValue={item.fullName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNo"
            label="Số điện thoại"
            initialValue={item.phoneNo}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            initialValue={item.address}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

export default AddressEdit