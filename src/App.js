import React, { Component } from 'react';
import 'antd/dist/antd.dark.css'
import './assets/css/App.css'
import './assets/css/nucleo-icons.css'
import { Layout, Typography } from 'antd'
import DataHeader from './components/DataHeader.js'
import { requestLatestData } from './api/data';

const { Content } = Layout;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latestData: null
    }
  }

  async componentDidMount() {
    let latestData = await requestLatestData()
    latestData = latestData['latest']
    this.setState({
      latestData: latestData
    })
  }

  render() {
    return (
      <Layout style={{ padding: "1%" }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <div className='container'>
          <DataHeader latestData={this.state.latestData} />
        </div>
      </Content>
    </Layout>
    )
  }
}

export default App;
