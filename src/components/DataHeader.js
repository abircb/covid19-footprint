import { Card, Row, Col } from "antd";
import React, { Component } from "react";
import LoadingCard from "../components/LoadingCard";
import { formatNum } from "../api/format"

const style = { textAlign: "center" };

class DataHeader extends Component {
  render() {
    const { latestData } = this.props;
    if (!latestData) {
      return <LoadingCard></LoadingCard>;
    }
    return (
      <>
        <Row gutter={24} style={style}>
          <Col span={12}>
            <Card title="Confirmed" bordered={true}>
              <i className="tim-icons icon-check-2" />
              <div style={style}>{formatNum(latestData.confirmed)}</div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Deaths" bordered={true}>
              <i className="tim-icons icon-alert-circle-exc" />
              <div style={style}>{formatNum(latestData.deaths)}</div>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default DataHeader;
