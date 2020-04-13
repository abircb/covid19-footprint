import React, { Component } from "react";
import { Row, Col, Typography } from "antd";
import logo from "../assets/img/logo.png";

const { Title } = Typography;

class Header extends Component {
  render() {
    return (
      <Row>
        <Col span={18}>
            <Title level={2}>COVID-19 Footprint</Title>
        </Col>
        <Col span={6}>
            <img src={logo} />
        </Col>
      </Row>
    );
  }
}

export default Header
