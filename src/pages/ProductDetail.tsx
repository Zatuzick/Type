

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../api/product";
import { SmileOutlined } from '@ant-design/icons';
import { Card, Button, notification } from "antd";

const { Meta } = Card;

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({ id: 0, name: '', price: 0, image: '', description: '' })

    useEffect(() => {
        getOneProduct(Number(id)).then(({ data }) => setProduct(data));
    }, [id]);

    const handleBuy = () => {
        // Your buy logic here
        alert(`Buying product: ${product.name}`);
    };
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: 'Thông báo',
            description:
                'Bạn đã mua hàng thành công',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };

    return (
        <div style={{ padding: "20px" }}>

            <Card
                cover={<img src={product.image} alt={product.name} />}
                style={{ width: 300, marginLeft: "40%" }}

            >

            </Card>
            <div>
                <Meta style={{ fontSize: "50px", marginLeft: "45%" }} title={product.name} />
                <Meta style={{ marginLeft: "10%", marginRight: "10%" }} description={product.description} />
                <p style={{ color: "red", fontSize: 18, fontWeight: "bold", marginTop: 16, marginLeft: "45%" }}>
                    {`Price: $${product.price}`} ₫
                </p>
                {contextHolder}
                <Button type="primary" onClick={openNotification} style={{ marginLeft: "46%" }}>
                    Buy
                </Button>
            </div>
        </div>
    );
};

export default ProductDetailPage;

