import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Clock extends Component {
constructor(props)
{
    super(props)
    this.state = {Date: new Date()}
}
async componentDidMount()
{
    setInterval(()=>{
        this.setState({
            date:new Date(),
        })
    },
    1000)
}
  render() {
    return (
      <div>
        <h1 className="heading">Clock</h1>
        <div className="containe d-flex-justify-content-center">
            {this.state.date}
        </div>
      </div>
    )
  }
}

export default Clock

