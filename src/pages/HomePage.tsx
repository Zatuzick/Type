

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Card, Col, Image, Layout, Menu, Row, theme } from "antd";
import "./homepage.css"
import { Outlet } from "react-router-dom";
import baner from "../assets/baner1.jpg";
import ad from "../assets/ad.jpeg";
import { IProduct } from "../types/product";
const { Header, Content, Footer } = Layout;
const { Item } = Menu;
type Props = {
  products: IProduct[],
};

const HomePage = (props: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [data, setData] = useState<IProduct[]>([])

  useEffect(() => {
    setData(props.products)
  }, [props])
  return (
    <div className="layoutClient__container">
      <Layout className="layout">
        <Header>

          <Menu>
            <Item key={"home"}>
              <Link to={"/"}>Home</Link>
            </Item>
            <Item key={"products"}>
              <Link to={"/products"}>Products</Link>
            </Item>
            <Item key={"signin"}>
              <Link to={"/admin"}>Login</Link>
            </Item>
            <Item key={"signup"}>
              <Link to={"/admin/register"}>Signup</Link>
            </Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div
            className="site-layout-content"
            style={{ background: colorBgContainer }}
          >
            <div className="banner__container">
              <img src={baner} alt="" />
            </div>
            <div style={{ padding: "20px", margin: "100px" }}>
              <Row gutter={[16, 16]}>
                {data.map((item) => (
                  <Col key={item.id} span={6}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<Image src={item.image} width={240} height={300} />}
                    >
                      <Card.Meta title={item.name} />
                      <Card.Meta description={<span style={{ color: 'red', textAlign: "center", marginLeft: "25%", marginTop: "10px", marginBottom: "10px" }}>{item.price} ₫</span>} />
                      <Link to={`/products/${item.id}`}>
                        <Button style={{ width: "100%", marginTop: "10px" }} type="primary" block>View Details</Button>
                      </Link>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <div className="footer-layout">Designed and made with by Văn Minh © 2023</div>
        </Footer>
      </Layout>
    </div>
  );
};

export default HomePage;
