/* global chrome */

import React, { Component } from 'react'
import { AutoComplete, Badge, Button, Table, message, Popconfirm } from 'antd'
import LoadingCard from './LoadingCard'
import { requestDataByCountry, checkIfMissing } from '../api/data'

const defaultCountries = ['united-kingdom', 'united-states']

class CountryDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      count: null,
      slugs: null,
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
        title: 'Recovered',
        dataIndex: 'recovered',
        key: 'recovered',
      },
      {
        title: 'Deaths',
        dataIndex: 'deaths',
        key: 'deaths',
      },
      {
        title: '',
        dataIndex: 'delete',
        render: (text, record) => (
          <Popconfirm
            title='Are you sure you want to remove this country?'
            onConfirm={() => this.deleteCountry(record.key)}
          >
            <i className='tim-icons icon-simple-remove' />
          </Popconfirm>
        ),
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
        this.setState({
          data: defaultData,
        })
      }
    */

  componentDidMount() {
    let cacheData = []
    let countryData = null
    chrome.storage.sync.get(['slugs'], (result) => {
      if (result.slugs) {
        console.log('Cache currently consists of' + result.slugs)
        result.slugs.forEach(async (slug) => {
          countryData = await requestDataByCountry(slug)
          cacheData.push(countryData)
        })
        this.setState(
          {
            data: cacheData,
            count: result.slugs.length,
            slugs: result.slugs,
          },
          function () {
            console.log('Displaying cached countries')
          }
        )
      } else {
        defaultCountries.forEach(async (slug) => {
          countryData = await requestDataByCountry(slug)
          cacheData.push(countryData)
        })
        this.setState(
          {
            data: cacheData,
            count: defaultCountries.length,
            slugs: defaultCountries,
          },
          () => {
            chrome.storage.sync.set({ slugs: this.state.slugs }, () => {
              console.log('Add default data to cache')
            })
          }
        )
      }
    })
  }

  async addCountry(slug) {
    const { data, count, slugs } = this.state
    if (count == 5) {
      message
        .warn(
          'Currently only support 5 countries to be added to your list',
          1.5
        )
        .then(() =>
          message.info(
            'Look out for future version where this feature may be added 🚀',
            1.5
          )
        )
    } else {
      if (slugs.includes(slug)) {
        message.info('Country already exists in your list', 1)
      } else {
        let countryData = await requestDataByCountry(slug)
        if (checkIfMissing(countryData)) {
          message
            .error('Data is currently unavailable for this country', 1.5)
            .then(() =>
              message.info(
                'If this issue persists, visit the support section on the Chrome Webstore',
                3
              )
            )
        } else {
          console.log(countryData)
          this.setState(
            {
              data: [...data, countryData],
              count: count + 1,
              slugs: [...slugs, slug],
            },
            () => {
              chrome.storage.sync.set({ slugs: this.state.slugs }, () => {
                message
                  .success('Added to your list', 1)
                  .then(
                    console.log('Cache now consists of ' + this.state.slugs)
                  )
              })
            }
          )
        }
      }
    }
  }

  deleteCountry(slug) {
    const { data, count, slugs } = this.state
    this.setState(
      {
        data: data.filter((item) => item.key !== slug),
        count: count - 1,
        slugs: slugs.filter((item) => item !== slug),
      },
      () => {
        chrome.storage.sync.set({ slugs: this.state.slugs }, () => {
          message
            .success('Removed from your list', 1)
            .then(console.log('Cache now consists of ' + this.state.slugs))
        })
      }
    )
  }

  render() {
    const { options } = this.props
    if (
      !options ||
      !this.state.data ||
      this.state.data.length !== this.state.count
    ) {
      return <LoadingCard></LoadingCard>
    }
    console.log(this.state.count)
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
          onSelect={(value, option) => {
            console.log(option)
            this.addCountry(option.slug)
          }}
          allowClear={true}
        />
        <Table
          columns={this.schema}
          dataSource={this.state.data}
          style={{
            width: '100%',
            marginTop: '3.7%',
          }}
          pagination={false}
        />
        <Button
          type='primary'
          onClick={(event) => {
            chrome.storage.sync.remove('slugs', function () {
              message
                .warn('Cleared Cache', 2)
                .then(console.log('Cache cleared'))
            })
          }}
          danger
        >
          Clear Cache
        </Button>
      </>
    )
  }

  // For testing Chrome Storage
  /*
  
  */
}

export default CountryDisplay
