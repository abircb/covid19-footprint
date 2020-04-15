import { Card, Row, Col } from 'antd'
import React, { Component } from 'react'
import LoadingCard from '../components/LoadingCard'
import { formatNum } from '../api/format'
import {
  ExclamationCircleOutlined,
  ForkOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'

const style = { textAlign: 'center' }

class DataHeader extends Component {
  render() {
    const { summary } = this.props
    if (!summary) {
      return <LoadingCard></LoadingCard>
    }
    return (
      <>
        <Row gutter={8} style={style}>
          <Col span={8}>
            <Card title='Confirmed' bordered={true}>
              <ForkOutlined style={{ color: '#2db7f5' }} />
              <div style={style}>{formatNum(summary.confirmed)}</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Recovered' bordered={true}>
              <CheckCircleOutlined style={{ color: '#87d068' }} />
              <div style={style}>{formatNum(summary.recovered)}</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Deaths' bordered={true}>
              <ExclamationCircleOutlined style={{ color: '#f50' }} />
              <div style={style}>{formatNum(summary.deaths)}</div>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default DataHeader