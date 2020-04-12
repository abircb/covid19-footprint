import React, { Component } from 'react';
import 'antd/dist/antd.dark.css'
import './assets/css/App.css'
import { Layout } from 'antd'
import DataHeader from './components/DataHeader.js'
import { requestLatestData } from './api/data';

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
      <div className="container">
        <DataHeader latestData={this.state.latestData}></DataHeader>
      </div>
    )
  }
}

export default App;
