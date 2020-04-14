import React, { Component } from "react";
import { AutoComplete, Badge, Row, Col } from "antd";
import LoadingCard from "./LoadingCard";

class CountryDisplay extends Component {
  render() {
    const { options } = this.props;
    if (!options) {
      return <LoadingCard></LoadingCard>;
    }
    return (
      <>
        <AutoComplete
          style={{
            width: "100%",
            marginTop: "5%",
          }}
          options={options}
          placeholder="Add Country"
          filterOption={(inputValue, option) =>
            option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
          onSelect={(value, option) => {
            console.log(option);
          }}
          allowClear={true}
        />
        <Row style={{ marginTop: "5%" }}>
          <Col span={8}>
          <Badge
              className="site-badge-count-109"
              count={109}
              style={{ backgroundColor: "#52c41a" }}
            /><br/>
            United States
          </Col>
          <Col span={16}>
            <br/>
            SS
          </Col>
        </Row>
      </>
    );
  }
}

export default CountryDisplay;
