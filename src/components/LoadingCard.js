import React from 'react'
import { Card, Avatar } from 'antd'

const { Meta } = Card

class LoadingCard extends React.Component {
  state = {
    loading: true,
  }

  onChange = (checked) => {
    this.setState({ loading: !checked })
  }

  render() {
    const { loading } = this.state

    return (
      <div>
        <Card style={{ width: '100%' }} loading={loading}>
          <Meta
            avatar={
              <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
            }
            title='Card title'
            description='This is the description'
          />
        </Card>
      </div>
    )
  }
}

export default LoadingCard
