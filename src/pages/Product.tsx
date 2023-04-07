

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Image } from 'antd';
import { IProduct } from '../types/product';


interface IProps {
    products: IProduct[],
    onRemove: (id: number) => void
}

const ProductPage = (props: IProps) => {

    const [data, setData] = useState<IProduct[]>([])

    useEffect(() => {
        setData(props.products)
    }, [props])


    return (
        <div>

            <h1 style={{ textAlign: "center" }}>ProductPage</h1>
            <div style={{ padding: "20px", margin: "100px" }}>
                <Row gutter={[16, 16]}>
                    {data.map((item) => (
                        <Col key={item.id} span={6}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<Image src={item.image} width={240} height={300} />}
                            >
                                <Card.Meta title={item.name} description={<span style={{ color: 'red', justifyItems: "center", margin: "0px" }}>{item.price} ₫</span>} />
                                <Link to={`/products/${item.id}`}>
                                    <Button>View Details</Button>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div >
    )
}

export default ProductPage;


