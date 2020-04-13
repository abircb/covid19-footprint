import { Card, Row, Col } from 'antd'
import React, { Component } from 'react'
import LoadingCard from '../components/LoadingCard'
import { formatNum } from '../api/format'

const style = { textAlign: 'center' }

class DataHeader extends Component {
  render() {
    const { summary } = this.props
    if (!summary) {
      return <LoadingCard></LoadingCard>
    }
    return (
      <>
        <Row gutter={4} style={style}>
          <Col span={8}>
            <Card title='Confirmed' bordered={true}>
              <i className='tim-icons icon-world' />
              <div style={style}>{formatNum(summary['TotalConfirmed'])}</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Deaths' bordered={true}>
              <i className='tim-icons icon-alert-circle-exc' />
              <div style={style}>{formatNum(summary['TotalDeaths'])}</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Recovered' bordered={true}>
              <i className='tim-icons icon-check-2' />
              <div style={style}>{formatNum(summary['TotalRecovered'])}</div>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default DataHeader
