import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './assets/css/App.css';
import DataHeader from './components/DataHeader.js'
import { requestLatestData } from './api/data';
import 'typeface-roboto'

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
      <html>
        <div className="content">
          <DataHeader latestData={this.state.latestData}></DataHeader>
        </div>
      </html>
    )
  }
}

export default App;
