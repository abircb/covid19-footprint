import React, { Component } from 'react'
import { AutoComplete, Badge, Table, message, Popconfirm } from 'antd'
import LoadingCard from './LoadingCard'
import { requestDataByCountry } from '../api/data'

const defaultCountries = ['united-states', 'united-kingdom', 'germany']

class CountryDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      count: 3,
      slugs: defaultCountries,
    }
    this.schema = [
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
      {
        title: '',
        dataIndex: 'delete',
        render: (text, record) =>
          this.state.count >= 1 ? (
            <Popconfirm
              title='Are you sure you want to remove this country?'
              onConfirm={async () => this.deleteCountry(record.key)}
            >
              <i className='tim-icons icon-simple-remove' />
            </Popconfirm>
          ) : null,
      },
    ]
  }

  /**
   * componentDidMount for React production build
   
   componentDidMount() {
    let defaultData = []
    let countryData = null
    this.state.slugs.forEach(async (slug) => {
      countryData = await requestDataByCountry(slug)
      defaultData.push(countryData)
    })
    console.log(defaultData)
    const { count, slugs } = this.state
    this.setState({
      data: defaultData,
      count: count + 1,
      slugs: [...slugs, 'united-states'],
    })
  }
   */

  componentDidMount() {
    let defaultData = []
    let countryData = null
    this.state.slugs.forEach(async (slug) => {
      countryData = await requestDataByCountry(slug)
      defaultData.push(countryData)
    })
    console.log(defaultData)
    const { count, slugs } = this.state
    this.setState({
      data: defaultData,
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

  async deleteCountry(slug) {
    const data = [...this.state.data]
    this.setState({
      data: data.filter((item) => item.key !== slug),
    })
    message.success('Removed from your list')
  }

  render() {
    const { options } = this.props
    if (!options && this.state.data.length === 0) {
      return <LoadingCard></LoadingCard>
    }
    return (
      <>
        <AutoComplete
          style={{
            width: '100%',
            marginTop: '3.7%',
          }}
          options={options}
          placeholder='Add a country'
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
          columns={this.schema}
          dataSource={this.state.data}
          style={{ width: '100%', marginTop: '3.7%' }}
        />
      </>
    )
  }
}

export default CountryDisplay
