import React, { Component } from 'react'
import { AutoComplete, Badge, Table, message } from 'antd'
import LoadingCard from './LoadingCard'
import { requestDataByCountry } from '../api/data'

const schema = [
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'New Cases',
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
      count: 0,
      slugs: [],
    }
  }

  async componentDidMount() {
    let defaultCountry = await requestDataByCountry('united-states')
    console.log(defaultCountry)
    const { data, count, slugs } = this.state
    this.setState({
      data: [...data, defaultCountry],
      count: count + 1,
      slugs: [...slugs, 'united-states'],
    })
  }

  async addCountry(slug) {
    const { data, count, slugs } = this.state
    if (slugs.includes(slug)) {
      message.info('Country already exists in your list', 1)
    } else {
      let countryData = await requestDataByCountry(slug)
      if (countryData['key'] === '404') {
        message
        .error('Data is currently unavailable for this country', 1.5)
        .then(() => message.info('If this issue persists, *something*', 2))
      
      } else {
        console.log(countryData)
        this.setState({
          data: [...data, countryData],
          count: count + 1,
          slugs: [...slugs, slug],
        })
        message.success('Added to your list', 1)
      }
    }
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
            this.addCountry(option.slug)
          }}
          allowClear={true}
        />
        <Table
          columns={schema}
          dataSource={this.state.data}
          style={{ width: '100%', marginTop: '5%' }}
        />
      </>
    )
  }
}

export default CountryDisplay
