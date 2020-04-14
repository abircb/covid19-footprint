import React, { Component } from 'react'
import { AutoComplete, Badge, Table } from 'antd'
import LoadingCard from './LoadingCard'
import { requestDataByCountry } from '../api/data'

const schema = [
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Change',
    dataIndex: 'delta',
    key: 'delta',
    render: (delta) => {
      return (
        <Badge
          count={delta}
          className='site-badge-count-4'
          style={{ backgroundColor: '#108ee9' }}
        />
      )
    },
  },
  {
    title: 'Confirmed',
    dataIndex: 'confirmed',
    key: 'confirmed',
  },
  {
    title: 'Deaths',
    dataIndex: 'deaths',
    key: 'deaths',
  },
  {
    title: 'Recovered',
    dataIndex: 'recovered',
    key: 'recovered',
  },
]

class CountryDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    let defaultCountry = await requestDataByCountry('united-states')
    console.log(defaultCountry)
    let allCountries = this.state.data
    allCountries.push(defaultCountry)
    this.setState({
      data: allCountries
    })
  }

  addCountry(countryData) {
    let allCountries = this.state.data
    allCountries.push(countryData)
    console.log(allCountries)
    this.setState({
      data: allCountries
    })
  }

  render() {
    const { options } = this.props
    if (!options && this.state.data.length == 0) {
      return <LoadingCard></LoadingCard>
    }
    return (
      <>
        <AutoComplete
          style={{
            width: '100%',
            marginTop: '5%',
          }}
          options={options}
          placeholder='Add Country'
          filterOption={(inputValue, option) =>
            option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
          onSelect={async (value, option) => {
            console.log(option)
            let countryData = await requestDataByCountry(option.slug)
            console.log(countryData)
            this.addCountry(countryData)
          }}
          allowClear={true}
        />
        <Table columns={schema} dataSource={this.state.data} style={{width: '100%', marginTop:'5%'}} />
      </>
    )
  }
}

export default CountryDisplay
