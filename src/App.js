import React, { Component } from 'react'
import { Layout } from 'antd'
import DataHeader from './components/DataHeader.js'
import Header from './components/Header.js'
import CountryDisplay from './components/CountryDisplay.js'
import { requestSummary, requestListOfCountries } from './api/data'
import { message } from 'antd'
import 'antd/dist/antd.dark.css'
import './assets/css/App.css'
import './assets/css/nucleo-icons.min.css'

const { Content } = Layout

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      summary: null,
      countries: null,
    }
  }

  async componentDidMount() {
    let summary = await requestSummary()
    let countries = await requestListOfCountries()
    this.setState({
      summary: summary,
      countries: countries,
    })
  }

  componentDidUpdate() {
    if (this.state.summary && this.state.countries) {
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
            <DataHeader summary={this.state.summary} />
            <CountryDisplay options={this.state.countries}/>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default App
