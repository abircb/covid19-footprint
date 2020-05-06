import React, { Component } from 'react'
import { Layout, Typography, message } from 'antd'
import DataHeader from './components/DataHeader.js'
import Header from './components/Header.js'
import CountryDisplay from './components/CountryDisplay.js'
import Footer from './components/Footer.js'
import { requestGlobalSummary, requestListOfCountries } from './api/data'
import { getInfoBit } from './static/bits'
import 'antd/dist/antd.dark.css'
import './assets/css/App.css'

const { Content } = Layout
const { Paragraph } = Typography

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      globalSummary: null,
      countries: null,
    }
  }

  async componentDidMount() {
    try {
      let countries = await requestListOfCountries()
      let globalSummary = await requestGlobalSummary()
      this.setState({
        countries: countries,
        globalSummary: globalSummary,
      })
    } catch (err) {
      message.error('A Network Error occurred', 1.5)
    }
  }

  componentDidUpdate() {
    if (this.state.countries && this.state.globalSummary) {
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
            <DataHeader
              summary={this.state.globalSummary}
              style={{ marginTop: '2%' }}
            />
            <CountryDisplay options={this.state.countries} />
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
