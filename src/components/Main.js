import React, { Component } from 'react'
import BuyForm from './BuyForm'
import Schedule from './Schedule'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy'
    }
  }

  render() {
    let content
    if(this.state.currentForm === 'buy') {
      content = <BuyForm
        balance={this.props.balance}
        withdraw={this.props.withdraw}
        loading={this.props.loading}
      />
    }

    let schedule
    if(this.props.account) { 
      schedule = <Schedule 
        nextSched={this.props.nextSched}
        stage={this.props.stage}
        complete={this.props.complete}
        account={this.props.account}
      />
    }

    return (
      <div id="content" className="mt-3">
        <div>
          <br></br>
          <h1 className="text-white text-center">KyotoVesting</h1>
          <br></br>
          <br></br>
        </div>
        
        {schedule}
          
        <div className="card mb-4" >
          <div className="card-body">

            {content}

          </div>
        </div>
        

      </div>
    );
  }
}

export default Main;
