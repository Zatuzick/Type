// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateProductPage = (props) => {
//     const navigate = useNavigate()
//     const {id} = useParams()
//     const {register, handleSubmit, reset} = useForm()
//     useEffect(() => {
//         const currentProduct = props.products.find((product) => product.id === Number(id))
//         reset(currentProduct)
//     },[props])
//     const onHandleSubmit = data => {
//         const status = confirm("Bạn chắc chưa??")
//         if(status) {
//             props.onUpdate(data);
//             navigate('/admin/products')
//         }

//     }
//     return (
//         <div>
//             <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
//                 <input type="text" {...register('name')}/>
//                 <input type="number" {...register('price')} />
//                 <button type="submit">Update</button>
//             </form>
//         </div>
//     )
// }

// export default UpdateProductPage;


// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { Form, Input, Button } from "antd";
// import TextArea from "antd/es/input/TextArea";

// const UpdateProductPage = (props) => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { register, handleSubmit, reset } = useForm();
//   const currentProduct = props.products.find(
//     (product) => product.id === Number(id)
//   );

//   useEffect(() => {
//     reset(currentProduct);
//   }, [props, reset, currentProduct]);

//   const onFinish = (data) => {
//     const status = window.confirm("Bạn chắc chưa??");
//     if (status) {
//       props.onUpdate({ ...data, id: currentProduct.id }); // Include the id parameter
//       navigate("/admin/products");
//     }
//   };

//   return (
//     <div>
//       <h1>Update Product</h1>
//     <Form layout="vertical" onFinish={onFinish} initialValues={currentProduct}>
//       <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true }]}>
//         <Input placeholder="Nhập tên sản phẩm" />
//       </Form.Item>
//       <Form.Item label="Giá sản phẩm" name="price" rules={[{ required: true }]}>
//         <Input type="number" placeholder="Nhập giá sản phẩm" />
//       </Form.Item>
//       <Form.Item label="Link ảnh" name="image" rules={[{ required: true }]}>
//         <Input placeholder="Link ảnh" />
//       </Form.Item>
//       <Form.Item label="Description" name="description" rules={[{ required: true }]}>
//         <TextArea placeholder="Description" />
//       </Form.Item>
//       <Button type="primary" htmlType="submit">
//         Update
//       </Button>
//     </Form>
//     </div>
//   );
// };

// export default UpdateProductPage;


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
    // khi biến product thay đổi thì sẽ chạy useEffect này
    setFields(); // gọi hàm setFields để set lại giá trị cho các input
  }, [product]);
  const [form] = Form.useForm();
  // khởi tạo một instance của Form và gán vào biến form
  // Instance của form là một đối tượng được tạo ra bởi Ant Design để thực hiện các chức năng của form trong React

  const setFields = () => {
    // hàm này để set lại giá trị cho các input
    form.setFieldsValue({
      // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
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
      // initialValues={product}
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
