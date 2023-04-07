

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio, RadioChangeEvent, Select } from "antd";
const { TextArea } = Input;
type Props = {
  onAdd: () => void;
  categories: any;
};

const AddProductPage = ({ onAdd, categories }: Props) => {
  const navigate = useNavigate();

  const onFinish = async (values: Props) => {
    try {
      await onAdd(values);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const data = categories.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });


  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Add New Product</h2>
      <div >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name Product"
            name="name"
            rules={[{ required: true, message: "Please input your name product!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Link ảnh" name="image" rules={[{ required: true }]}>
            <Input placeholder="Link ảnh" />
          </Form.Item>

          <Form.Item
            label="Description Product"
            name="description"
            rules={[{ required: true, message: "Please input your description!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}></Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add New Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  );
};

export default AddProductPage;
