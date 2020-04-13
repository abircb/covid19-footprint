import React, { Component } from 'react'
import { Layout } from 'antd'
import DataHeader from './components/DataHeader.js'
import Header from './components/Header.js'
import LocationFilter from './components/LocationFilter.js'
import { requestLatestData, requestListOfCountries } from './api/data'
import { message } from 'antd'
import 'antd/dist/antd.dark.css'
import './assets/css/App.css'
import './assets/css/nucleo-icons.min.css'

const { Content } = Layout

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latestData: null,
      countries: null,
    }
  }

  async componentDidMount() {
    let latestData = await requestLatestData()
    let countries = await requestListOfCountries()
    latestData = latestData['latest']
    this.setState({
      latestData: latestData,
      countries: countries,
    })
  }

  componentDidUpdate() {
    if (this.state.latestData && this.state.countries) {
      message.success('Retrieved latest data', 1)
    }
  }

  render() {
    return (
      <Layout style={{ padding: '1%' }}>
        <Content
          className='site-layout-background'
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <div className='container'>
            <Header />
            <DataHeader latestData={this.state.latestData} />
            <LocationFilter options={this.state.countries}/>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default App
