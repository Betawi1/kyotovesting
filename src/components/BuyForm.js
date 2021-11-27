import React, { Component } from 'react'

class BuyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          this.props.withdraw()
        }}>
        <button type="submit" className="btn btn-primary btn-block btn-lg">WITHDRAW</button>
        <div>
          <br></br>
          Your token balance: {this.props.balance} KYO
        </div>
      </form>
    );
  }
}

export default BuyForm;
