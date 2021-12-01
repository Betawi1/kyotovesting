import React, { Component } from 'react'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <div className="card mb-4" >
        <div className="card-body">
          Your {this.props.stage} withdrawal date: {this.props.nextSched}
          <br></br>
          Vestments completed: {this.props.complete}/12
          <br></br>
          Vestment account balance: {this.props.remaining} KYO
        </div>
      </div>
    );
  }
}

export default Schedule;