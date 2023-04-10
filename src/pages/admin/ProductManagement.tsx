

import React from "react";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct } from "../../types/product";
import { Link } from "react-router-dom";
type Props = {
  products: IProduct[];
  onRemove: () => void;
};

const ProductManagementPage = ({ products, onRemove }: Props) => {
  const data = products.map((product) => {
    return {
      key: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
    };
  });
  interface DataType {
    key: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
  }
  const onHandleRemove = (id: number | string) => {
    const title = "Sure to delete?"
    if (title) {
      onRemove(id);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name Product",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price Product",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image Product",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        <div typeof="width:100px; height:150px">
          <img src={image} alt="product" width="100px" height="150px" />
        </div>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary">
            <Link to={`/admin/products/${record.key}/update`}>Edit</Link>{" "}
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => onHandleRemove(record.key)}>
            <Button type="primary" danger>DELETE</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Quản lý sản phẩm</h1>
      <div style={{ margin: "100px" }}>
        <Space style={{ margin: "20px" }}>
          <Button type="primary"><Link to="/admin/products/add">Add Product</Link></Button>
        </Space>
        <Space >
          <Button key="home"><Link to="/">Home</Link></Button>
        </Space>
        <Space style={{ margin: "20px" }}>
          <Button key="add"><Link to="/admin/products/add">Add New Product</Link></Button>
        </Space>
        <Table columns={columns} dataSource={data} />
      </div>

    </div>

  );
};

export default ProductManagementPage;
