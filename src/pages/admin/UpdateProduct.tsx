
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IProduct } from "../../types/product";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
const { TextArea } = Input;
type Props = {
  products: IProduct[];
  onUpdate: (props: Props) => void;
  categories: any;
};

const UpdateProductPage = ({ products, onUpdate, categories }: Props) => {
  const { id: id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const data = products.find((item) => item.id == id);
    setProduct(data);
  }, [products]);
  useEffect(() => {

    setFields();
  }, [product]);
  const [form] = Form.useForm();

  const setFields = () => {

    form.setFieldsValue({

      id: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      description: product?.description,
    });
  };

  const onFinish = (values: any) => {
    onUpdate({ id, ...values });
    navigate("/admin/products");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const dataCate = categories.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}

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
        label="Price Product"
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Update Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProductPage;
