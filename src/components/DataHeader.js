import { Row, Col } from "antd";
import React, { Component } from "react";
import '../assets/css/DataHeader.css'

class DataHeader extends Component {
  render() {
    const { latestData } = this.props;
    if (!latestData) {
      return <div>Loading ...</div>;
    }
    return (
      <>
        <Row>
          <Col span={12}><div className="text">Confirmed: {latestData.confirmed}</div></Col>
          <Col span={12}><div className="text">Deaths: {latestData.deaths}</div></Col>
        </Row>
      </>
    );
  }
}

export default DataHeader;
