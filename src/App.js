import React, { Component } from 'react'
import { Layout, Typography } from 'antd'
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
    let countries = await requestListOfCountries()
    let globalSummary = await requestGlobalSummary()
    this.setState({
      countries: countries,
      globalSummary: globalSummary,
    })
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
            <DataHeader summary={this.state.globalSummary} />
            <CountryDisplay options={this.state.countries} />
            <Paragraph style={{ fontSize: '11px', textAlign: 'center'}} copyable strong>
              {getInfoBit()}
            </Paragraph>
            <Footer
              style={{
                paddingTop: '2%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </div>
        </Content>
      </Layout>
    )
  }
}

export default App
