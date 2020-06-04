import { Card, Row, Col } from 'antd'
import React, { Component } from 'react'
import LoadingCard from '../components/LoadingCard'
import { formatNum } from '../api/format'
import {
  ExclamationCircleOutlined,
  ForkOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import PropTypes from 'prop-types'

const totalStyle = { textAlign: 'center' }
const deltaStyle = { textAlign: 'center', fontSize: '10px' }

class DataHeader extends Component {
  render() {
    const { summary } = this.props
    if (!summary) {
      return <LoadingCard></LoadingCard>
    }
    return (
      <>
        <Row gutter={8} style={totalStyle}>
          <Col span={8}>
            <Card title='Confirmed' bordered={true}>
              <ForkOutlined style={{ color: '#2db7f5' }} />
              <div style={totalStyle}>{formatNum(summary.confirmed)}</div>
              <div style={deltaStyle}>
                {'+'.concat(formatNum(summary.newConfirmed))}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Recovered' bordered={true}>
              <CheckCircleOutlined style={{ color: '#87d068' }} />
              <div style={totalStyle}>{formatNum(summary.recovered)}</div>
              <div style={deltaStyle}>
                {'+'.concat(formatNum(summary.newRecovered))}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Deaths' bordered={true}>
              <ExclamationCircleOutlined style={{ color: '#f50' }} />
              <div style={totalStyle}>{formatNum(summary.deaths)}</div>
              <div style={deltaStyle}>
                {'+'.concat(formatNum(summary.newDeaths))}
              </div>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

DataHeader.propTypes = {
  summary: PropTypes.object,
}

export default DataHeader
