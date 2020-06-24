/* global chrome */

import React, { Component } from 'react'
import { AutoComplete, Badge, Table, message, Popconfirm } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import LoadingCard from './LoadingCard'
import { requestDataByCountry, checkIfMissing } from '../api/data'
// import { Button } from 'antd'
// for testing Chrome Storage/Cache

const defaultCountries = ['united-kingdom', 'united-states']

class CountryDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      count: null,
      slugs: null,
      initialised: false,
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
            <CloseOutlined />
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

  initialiseData() {
    const { globalData } = this.props
    let cacheData = []
    let countryData = null
    chrome.storage.sync.get(['slugs'], (result) => {
      if (result.slugs) {
        result.slugs.forEach((slug) => {
          countryData = requestDataByCountry(slug, globalData)
          cacheData.push(countryData)
        })
        this.setState({
          data: cacheData,
          count: result.slugs.length,
          slugs: result.slugs,
          initialised: true,
        })
      } else {
        defaultCountries.forEach((slug) => {
          countryData = requestDataByCountry(slug, globalData)
          cacheData.push(countryData)
        })
        this.setState({
          data: cacheData,
          count: defaultCountries.length,
          slugs: defaultCountries,
          initialised: true,
        })
      }
    })
  }

  addCountry(slug) {
    const { globalData } = this.props
    const { data, count, slugs } = this.state
    if (count === 5) {
      this.dataOverflowMessage()
    } else {
      if (slugs.includes(slug)) {
        message.info('Country already exists in your list', 1)
      } else {
        let countryData = requestDataByCountry(slug, globalData)
        if (checkIfMissing(countryData)) {
          this.missingDataMessage()
        } else {
          this.setState(
            {
              data: [...data, countryData],
              count: count + 1,
              slugs: [...slugs, slug],
            },
            () => {
              chrome.storage.sync.set({ slugs: this.state.slugs }, () => {
                message.success('Added to your list', 1)
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
          message.success('Removed from your list', 1)
        })
      }
    )
  }

  dataOverflowMessage = () => {
    message
      .warn(
        'COVID-19 Footprint currently only supports 5 countries to be added to your list',
        2.5
      )
      .then(() =>
        message.info(
          'Look out for future versions for feature enhancements 🚀',
          2.5
        )
      )
  }

  missingDataMessage = () => {
    message
      .error('Data is currently unavailable for this country', 1.5)
      .then(() =>
        message.info(
          'If this issue persists, visit the support section on the Chrome Webstore',
          3
        )
      )
  }

  render() {
    const { globalData, options } = this.props
    if (!globalData || !options) {
      return (
        <>
          <LoadingCard />
        </>
      )
    }
    if (!this.state.initialised) this.initialiseData()
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
            marginBottom: '3.7%',
          }}
          pagination={false}
        />
      </>
    )
  }

  // For testing Chrome Storage
  /*
    <Button
      type="primary"
      onClick={(event) => {
        chrome.storage.sync.remove("slugs", function () {
          message.warn("Cleared Cache", 2).then(() => {console.log("Cache cleared")});
        });
      }}
      danger
    >
      Clear Cache
    </Button>
  */
}

export default CountryDisplay
