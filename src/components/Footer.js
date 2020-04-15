import React, {Component} from 'react'
import {Row, Col} from 'antd'
import {GithubOutlined, MailOutlined} from '@ant-design/icons'

class Footer extends Component {
  render() {
    return (
      <Row gutter={2} justify={'center'} style={{textAlign: 'center'}}>
        <Col span={2}>
          <a
            href={'https://github.com/abircb/covid19-footprint'}
            target={'_blank'}
          >
            <GithubOutlined />
          </a>
        </Col>
        <Col span={2}>
          <a href={'mailto:bhushan.abir@gmail.com'} target={'_blank'}>
            <MailOutlined />
          </a>
        </Col>
      </Row>
    )
  }
}

export default Footer
