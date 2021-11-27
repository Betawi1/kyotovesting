import React, { Component } from 'react'
import BuyForm from './BuyForm'
//import SellForm from './SellForm'

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
        buyTokens={this.props.buyTokens}
        loading={this.props.loading}
      />
    }

    return (
      <div id="content" className="mt-3">
        <div>
          <br></br>
          <h1 className="text-white text-center">KyotoSwap</h1>
          <br></br>
          <br></br>
        </div>
        <div className="card mb-4" >
          <div className="card-body">
            {content}
          </div>
        </div>
        <div className="card mb-4" >
          <div className="card-body">
            *PLEASE READ BEFORE DOING THE SWAP* <br/><br/>
            This KyotoSwap App is a decentralized application or DApp.<br/><br/>You must have a Metamask wallet or Trust Wallet to connect to this DApp.<br/><br/>Please make sure that you change your wallet network to 'Smart Chain' and the public address shown beside the identicon matches your wallet address before you make the swap.<br/><br/>You must also have BNB (smart chain, BEP-20) tokens in your Metamask wallet to pay for the network transaction fee.<br/><br/>You can only swap BUSD (Binance-Peg BUSD Token, token address: 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56) for Kyotocoin (KYO, token address: 0xaEBC9EbDd1CD6808b632aA675eA571EEddD0C5b4).<br/><br/>User who does not have BNB & BUSD can purchase it at:<br/>1. CEX.IO by visiting https://cex.io/buy-binance-coin-bnb.<br/>2. Moonpay.com, please make sure to select ‘BNB - Binance Coin (BEP-20)’ for BNB and select 'BUSD - Binance USD (BEP-20)' for BUSD.<br/>3. Trust Wallet Users can also purchase both BNB (Smart Chain) and ‘Binance-Peg BUSD (BEP20)’ through MoonPay.<br/> 4. You can also purchase through crypto exchanges such as FTX.com and on Binance itself (subject to availability in your country).
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
