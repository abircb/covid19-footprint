import React, { Component } from 'react'
import { AutoComplete } from 'antd'
import LoadingCard from './LoadingCard'

class CountryDisplay extends Component {
  render() {
    const { options } = this.props
    if (!options) {
      return <LoadingCard></LoadingCard>
    }
    return (
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
    )
  }
}

export default CountryDisplay
