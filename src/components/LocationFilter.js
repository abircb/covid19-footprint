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
          paddingTop: '5%',
        }}
        options={options}
        placeholder='Add Country'
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    )
  }
}

export default LocationFilter
