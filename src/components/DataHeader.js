import { Card, Row, Col } from "antd";
import React, { Component } from "react";

class DataHeader extends Component {
  render() {
    const { latestData } = this.props;
    if (!latestData) {
      return <div>Loading ...</div>;
    }
    return (
      <>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Confirmed" bordered={false}>
              {latestData.confirmed}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Deaths" bordered={false}>
              {latestData.deaths}
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default DataHeader;
