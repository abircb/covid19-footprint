import React, { Component } from 'react'
import { AutoComplete } from 'antd'

class LocationFilter extends Component {
  render() {
    const { options } = this.props
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
        open={false}
      />
    )
  }
}

export default LocationFilter
