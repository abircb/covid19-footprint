import React, { Component } from 'react'
import { Row, Col, Typography } from 'antd'
import logo from '../assets/img/logo.png'
import '../assets/css/Header.css'

const { Title } = Typography

class Header extends Component {
  render() {
    return (
      <Row gutter={16}>
        <Col span={18}>
          <Title level={3}>
            COVID-19
            <br />
            Footprint
          </Title>
        </Col>
        <Col span={6} style={{ marginTop: '2%', textAlign: 'center'}}>
          <img src={logo} className='image' alt='logo' />
        </Col>
      </Row>
    )
  }
}

export default Header
