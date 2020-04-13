import React, { Component } from "react";
import { Row, Col, Typography } from "antd";
import logo from "../assets/img/logo.png";
import '../assets/css/Header.css'

const { Title } = Typography;

class Header extends Component {
  render() {
    return (
      <Row>
        <Col span={18}>
            <Title level={2}>COVID-19 Footprint</Title>
        </Col>
        <Col span={6} style={{marginTop: '4%'}}>
        <img src={logo} className="image" />
        </Col>
      </Row>
    );
  }
}

export default Header
