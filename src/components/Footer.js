import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { ApiFilled, GithubFilled, MailOutlined } from '@ant-design/icons'

class Footer extends Component {
  render() {
    return (
      <Row gutter={2} justify={'center'} style={{ textAlign: 'center' }}>
        <Col span={2}>
          <a
            href={
              'https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest'
            }
            target={'_blank'}
            rel={"noopener noreferrer"}>
            <ApiFilled />
          </a>
        </Col>
        <Col span={2}>
          <a
            href={'https://github.com/abircb/covid19-footprint'}
            target={'_blank'}
            rel={"noopener noreferrer"}>
            <GithubFilled />
          </a>
        </Col>
        <Col span={2}>
          <a href={'mailto:bhushan.abir@gmail.com'} target={'_blank'} rel={"noopener noreferrer"}>
            <MailOutlined />
          </a>
        </Col>
      </Row>
    )
  }
}

export default Footer
