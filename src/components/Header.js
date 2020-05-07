import React, { Component } from 'react'
import { Row, Col } from 'antd'
import logo from '../assets/img/logo.png'
import '../assets/css/Header.css'

class Header extends Component {
  render() {
    return (
      <Row justify={'center'}>
        <Col span={3} style={{ textAlign: 'center', paddingBottom: '1%' }}>
          <img src={logo} className='image' alt='logo' />
        </Col>
      </Row>
    )
  }
}

export default Header
