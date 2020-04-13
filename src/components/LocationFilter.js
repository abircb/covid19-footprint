import React, { Component } from 'react'
import { AutoComplete } from 'antd'
import LoadingCard from './LoadingCard'

class LocationFilter extends Component {
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
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onSelect={(value) => {
          console.log(value)
        }}
        allowClear={true}
      />
    )
  }
}

export default LocationFilter
