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
          style={{ backgroundColor: '#52c41a' }}
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

const data = [

]

class CountryDisplay extends Component {
  render() {
    const { options } = this.props
    if (!options) {
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
          onSelect={(value, option) => {
            console.log(option)
          }}
          allowClear={true}
        />
        <Table columns={schema} dataSource={data} style={{width: '100%', marginTop:'5%'}} />
      </>
    )
  }
}

export default CountryDisplay
