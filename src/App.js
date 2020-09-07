import React, { Component } from 'react'
import { Layout, Typography, message } from 'antd'
import DataHeader from './components/DataHeader.js'
import Header from './components/Header.js'
import CountryDisplay from './components/CountryDisplay.js'
import Footer from './components/Footer.js'
import {
  requestGlobalData,
  requestListOfCountries,
  extractGlobalSummary,
  extractCountryData,
} from './api/data'
import { getInfoBit } from './static/bits'
import 'antd/dist/antd.dark.css'
import './assets/css/App.css'

const { Content } = Layout
const { Paragraph } = Typography

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      globalData: null,
      globalSummary: null,
      countries: null,
      countryData: null,
      hasError: false,
    }
  }

  async componentDidMount() {
    try {
      const globalData = await requestGlobalData()
      const countries = await requestListOfCountries()
      const globalSummary = extractGlobalSummary(globalData)
      const countryData = extractCountryData(globalData)
      this.setState({
        countries: countries,
        globalSummary: globalSummary,
        countryData: countryData,
      })
    } catch (err) {
      this.setState({ hasError: true })
    }
  }

  componentDidUpdate() {
    if (this.state.countries && this.state.globalData) {
      message.success('Retrieved latest data', 1)
    }
  }

  render() {
    if (this.state.hasError) {
      message.error('A Network Error occurred', 1.5)
    }
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
            <DataHeader
              summary={this.state.globalSummary}
              style={{ marginTop: '2%' }}
            />
            <CountryDisplay
              options={this.state.countries}
              globalData={this.state.countryData}
            />
            <Paragraph
              style={{ fontSize: '11px', textAlign: 'center', color: '#fff' }}
              copyable
            >
              {getInfoBit()}
            </Paragraph>
            <Footer />
          </div>
        </Content>
      </Layout>
    )
  }
}

export default App
