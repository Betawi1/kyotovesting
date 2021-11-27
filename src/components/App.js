import React, { Component } from 'react'
import Web3 from 'web3'
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import Navbar from './Navbar'
import Main from './Main'
import { getChain } from 'evm-chains'
import './App.css'
import KyoVesting from '../abis/KyoVesting.json'

//KYO Coin
const KYOC_ABI = [{"inputs":[{"internalType":"address","name":"_reservesAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"carboncharityAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"carboncharityTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"holderTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpStakingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reservesAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reservesTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"},{"internalType":"bool","name":"_deductTransferFee","type":"bool"}],"name":"rewardsFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_carboncharityAddress","type":"address"}],"name":"setCarbonCharityAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpStakingAddress","type":"address"}],"name":"setLpStakingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_reservesAddress","type":"address"}],"name":"setReservesAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_holderTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_reservesTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_lpTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_carboncharityTaxAlloc","type":"uint256"}],"name":"setTaxAllocations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_taxPercentage","type":"uint256"}],"name":"setTaxPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"taxPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardAmount","type":"uint256"}],"name":"tokenWithRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCarbonCharityFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalHolderFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLpFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReservesFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const KYOC_ADDRESS = "0xaEBC9EbDd1CD6808b632aA675eA571EEddD0C5b4"

//KyotoVesting
const KYO_ABI = KyoVesting.abi
const KYO_ADDRESS = "0xFE9aa292a023bEe7d1eB808C827C021A67Ef6a06"

class App extends Component {
  async componentWillMount() {
    await this.init()
  }

  async init() {
    // Declare WalletConnect
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            56: "https://bsc-dataseed.binance.org/",
          },
          network: "binance",
        },
      },
    }

    var web3Modal = new Web3Modal({
      providerOptions,
      disableInjectedProvider: false, // Declare Metamask
    })

    this.setState({web3Modal: web3Modal})

    // settings for MetaMask
    if(typeof window.ethereum!=='undefined'){
      let network, web3

      window.ethereum.autoRefreshOnNetworkChange = false;
      web3 = new Web3(window.ethereum)
      this.setState({web3: web3})

      // Update address and account when MetaMask changes account
      window.ethereum.on('accountsChanged', async (accounts) => {
        if(typeof accounts[0] === 'undefined'){
          this.setState({ account: null, provider: null })
        } else if(this.state.provider === null){
          this.setState({ accounts: null, loading: true })
          this.setState({ account: accounts[0], loading: false })
        }
      })

      window.ethereum.on('chainChanged', async (chainId) => {
        this.setState({network: null, loading: true, onlyNetwork: true})

        network = await getChain(parseInt(chainId, 16))
        this.setState({network: network.network, loading: false, onlyNetwork: false })
      })
    }
  }

  //connect button
  async on(event){
    event.preventDefault()

    //restore provider session
    await this.state.web3Modal.clearCachedProvider()
    let provider, account, network, web3
    
    try {
      this.setState({loading: true, provider: null})
      //activate windows with providers
      provider = await this.state.web3Modal.connect()
      web3 = new Web3(provider)

      this.setState({provider: provider, web3: web3})

      // when metamask is chosen
      if (provider.isMetaMask){
        account = provider.selectedAddress
        network = await getChain(parseInt(provider.chainId, 16))
      } else if (provider.wc){ // when walletconnect is chosen
      //  if(provider.accounts[0] !== 'undefined'){
        account = await provider.accounts[0]
        network = await getChain(provider.chainId, 56)
      }
      console.log(network.network)

      this.setState({ account: account, network: network.network })

      
      let kyoVesting = this.state.web3.eth.Contract(KYO_ABI, KYO_ADDRESS)
      this.setState({ kyoVesting })

      let kyoCoin = this.state.web3.eth.Contract(KYOC_ABI, KYOC_ADDRESS)
      this.setState({ kyoCoin })

      this.refreshBalance()
      this.vestingSchedule()

      this.setState({
        web3: web3,
        loading: false,
        provider: provider,
      })

    } catch(e) {
      console.log("Could not get a wallet connected.")
      return
    }

    // update account. sans balance
    provider.on("accountsChanged", async (accounts) => {
      let account

      this.setState({account: null, loading: true})

      if(provider.isMetaMask && provider.selectedAddress!==null){
        account = provider.selectedAddress
      } else if (provider.wc){
        account = provider.accounts[0]
      }

      this.refreshBalance()
      this.vestingSchedule()

      this.setState({account: account, loading: false})
    })

    // update network
    provider.on("chainChanged", async (chainId) => {
      //let account, network, web3
      let network, web3
      this.setState({network: null, loading:true})

      if(provider.isMetaMask && provider.selectedAddress!==null) {
        web3 = new Web3(provider)
        network = await getChain(parseInt(provider.chainId, 16))

      } else if(provider.wc) {
        web3 = new Web3(provider)
        network = await getChain(chainId)
      }
      await this.setState({network: network.network, web3: web3, loading: false})
    })
  }

  // disconnect button
  async off(event){
    event.preventDefault()

    if(this.state.provider===null || typeof this.state.provider==='undefined'){
      window.alert('Please disconnect manually on MetaMask')
    } else {
      if(this.state.provider!==null && this.state.provider.wc){
        await this.state.provider.disconnect() //disconnect web3modal+walletconnect
        this.setState({account:null})

        // in case metamask is installed
        if(window.ethereum){
          const network = await getChain(parseInt(window.ethereum.chainId, 16))
          this.setState({network: network.network})
        } else {
          this.setState({network: null})
        }
      } else if (this.state.provider!==null && this.state.provider.isMetaMask){
        await this.state.provider.close 
      }

      this.setState({provider: null})

      await this.state.web3Modal.clearCachedProvider()
    }
  }

  async offQr(event){
    event.preventDefault()

    if(this.state.provider.wc){
      await this.state.provider.disconnect()
      this.setState({
        account: null,
        provider: null
      })
      if(window.ethereum){
        const network = await getChain(parseInt(window.ethereum.chainId, 16))
        this.setState({network: network.network})
      } else {
        this.setState({network: null})
      }
    }
  }

  withdraw = (event) => {
  	this.setState({ loading: true })
  	if(this.state.provider!==null){
  	  this.state.kyoVesting.methods.withdraw().send({ from: this.state.account }).on('transactionHash', (hash) => {
  	  	window.alert('Your withdraw request is successfully sent. Please allow for the network to confirm your transaction.')
  	  	this.setState({ loading: false })
  	  }).on('error', (error) => {
  	  	this.setState({ loading: false })
  	  })
  	} else {
  		window.alert('Please click the CONNECT button to link your wallet first.')
  		this.setState({ loading: true })
  	}
  }

  async refreshBalance(event){
    let balance

    if(this.state.account!==null){
      balance = await this.state.kyoCoin.methods.balanceOf(this.state.account).call({ from: this.state.account })
      balance = balance.toString(10)
      balance = this.state.web3.utils.fromWei(balance, 'ether')
    } else {
      balance = 0
    }
    this.setState({ balance: balance })
  }

  async vestingSchedule(event){
  	let next, stage

  	let first = await this.state.kyoVesting.methods.first_schedule(this.state.account).call({ from: this.state.account })
  	let first_payment = await this.state.kyoVesting.methods.first_payment(this.state.account).call({ from: this.state.account })
    first = first.toString()
    first_payment = parseInt(first_payment.toString())
    var firstDate = new Date(parseInt(first)*1000)

    let second = await this.state.kyoVesting.methods.second_schedule(this.state.account).call({ from: this.state.account })
    let second_payment = await this.state.kyoVesting.methods.second_payment(this.state.account).call({ from: this.state.account })
    second = second.toString()
    second_payment = parseInt(second_payment.toString())
    var secondDate = new Date(parseInt(second)*1000)

    let third = await this.state.kyoVesting.methods.third_schedule(this.state.account).call({ from: this.state.account })
    let third_payment = await this.state.kyoVesting.methods.third_payment(this.state.account).call({ from: this.state.account })
    third = third.toString()
    third_payment = parseInt(third_payment.toString())
    var thirdDate = new Date(parseInt(third)*1000)

    let fourth = await this.state.kyoVesting.methods.fourth_schedule(this.state.account).call({ from: this.state.account })
    let fourth_payment = await this.state.kyoVesting.methods.fourth_payment(this.state.account).call({ from: this.state.account })
    fourth = fourth.toString()
    fourth_payment = parseInt(fourth_payment.toString())
    var fourthDate = new Date(parseInt(fourth)*1000)

    let fifth = await this.state.kyoVesting.methods.fifth_schedule(this.state.account).call({ from: this.state.account })
    let fifth_payment = await this.state.kyoVesting.methods.fifth_payment(this.state.account).call({ from: this.state.account })
    fifth = fifth.toString()
    fifth_payment = parseInt(fifth_payment.toString())
    var fifthDate = new Date(parseInt(fifth)*1000)

    let sixth = await this.state.kyoVesting.methods.sixth_schedule(this.state.account).call({ from: this.state.account })
    let sixth_payment = await this.state.kyoVesting.methods.sixth_payment(this.state.account).call({ from: this.state.account })
    sixth = sixth.toString()
    sixth_payment = parseInt(sixth_payment.toString())
    var sixthDate = new Date(parseInt(sixth)*1000)

    let seventh = await this.state.kyoVesting.methods.seventh_schedule(this.state.account).call({ from: this.state.account })
    let seventh_payment = await this.state.kyoVesting.methods.seventh_payment(this.state.account).call({ from: this.state.account })
    seventh = seventh.toString()
    seventh_payment = parseInt(seventh_payment.toString())
    var seventhDate = new Date(parseInt(seventh)*1000)

    let eighth = await this.state.kyoVesting.methods.eighth_schedule(this.state.account).call({ from: this.state.account })
    let eighth_payment = await this.state.kyoVesting.methods.eighth_payment(this.state.account).call({ from: this.state.account })
    eighth = eighth.toString()
    eighth_payment = parseInt(eighth_payment.toString())
    var eighthDate = new Date(parseInt(eighth)*1000)

    let ninth = await this.state.kyoVesting.methods.ninth_schedule(this.state.account).call({ from: this.state.account })
    let ninth_payment = await this.state.kyoVesting.methods.ninth_payment(this.state.account).call({ from: this.state.account })
    ninth = ninth.toString()
    ninth_payment = parseInt(ninth_payment.toString())
    var ninthDate = new Date(parseInt(ninth)*1000)

    let tenth = await this.state.kyoVesting.methods.tenth_schedule(this.state.account).call({ from: this.state.account })
    let tenth_payment = await this.state.kyoVesting.methods.tenth_payment(this.state.account).call({ from: this.state.account })
    tenth = tenth.toString()
    tenth_payment = parseInt(tenth_payment.toString())
    var tenthDate = new Date(parseInt(tenth)*1000)

    let eleventh = await this.state.kyoVesting.methods.eleventh_schedule(this.state.account).call({ from: this.state.account })
    let eleventh_payment = await this.state.kyoVesting.methods.eleventh_payment(this.state.account).call({ from: this.state.account })
    eleventh = eleventh.toString()
    eleventh_payment = parseInt(eleventh_payment.toString())
    var eleventhDate = new Date(parseInt(eleventh)*1000)

    let twelfth = await this.state.kyoVesting.methods.twelfth_schedule(this.state.account).call({ from: this.state.account })
    let twelfth_payment = await this.state.kyoVesting.methods.twelfth_payment(this.state.account).call({ from: this.state.account })
    twelfth = twelfth.toString()
    twelfth_payment = parseInt(twelfth_payment.toString())
    let twelfthDate = new Date(parseInt(twelfth)*1000)

    if(Date.now() > first && first_payment > 0) {
      next = firstDate.toLocaleString()
      stage = 'first'
    } else if (Date.now() > second && second_payment > 0) {
      next = secondDate.toLocaleString()
      stage = 'second'
    } else if (Date.now() > third && third_payment > 0) {
      next = thirdDate.toLocaleString()
      stage = 'third'
    } else if (Date.now() > fourth && fourth_payment > 0) {
      next = fourthDate.toLocaleString()
      stage = 'fourth'
    } else if (Date.now() > fifth && fifth_payment > 0) {
      next = fifthDate.toLocaleString()
      stage = 'fifth'
    } else if (Date.now() > sixth && sixth_payment > 0) {
      next = sixthDate.toLocaleString()
      stage = 'sixth'
    } else if (Date.now() > seventh && seventh_payment > 0) {
      next = seventhDate.toLocaleString()
      stage = 'seventh'
    } else if (Date.now() > eighth && eighth_payment > 0) {
      next = eighthDate.toLocaleString()
      stage = 'eighth'
    } else if (Date.now() > ninth && ninth_payment > 0) {
      next = ninthDate.toLocaleString()
      stage = 'ninth'
    } else if (Date.now() > tenth && tenth_payment > 0) {
      next = tenthDate.toLocaleString()
      stage = 'tenth'
    } else if (Date.now() > eleventh && eleventh_payment > 0) {
      next = eleventhDate.toLocaleString()
      stage = 'eleventh'
    } else if (Date.now() > twelfth && twelfth_payment > 0) {
      next = twelfthDate.toLocaleString()
      stage = 'twelfth'
    } else {
      next = 'No further vestment possible.'
      stage = ''
    }

    this.setState({ nextSched: next })
    this.setState({ stage: stage })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: null,
      kyoVesting: {},
      kyoCoin: {},
      network: null,
      provider: null,
      loading: false,
      onlyNetwork: false,
      balance: 0,
    }

    this.on = this.on.bind(this)
    this.off = this.off.bind(this)
    this.offQr = this.offQr.bind(this)
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center text-white"><br></br><br></br><br></br>Please wait... Processing your transaction...</p>
    } else {
      content = <Main
        offQr={this.offQr}
        account={this.state.account}
        loading={this.state.loading}
        network={this.state.network}
        provider={this.state.provider}
        onlyNetwork={this.state.onlyNetwork}
        withdraw={this.withdraw}
        balance={this.state.balance}
        nextSched={this.state.nextSched}
        stage={this.state.stage}
      />
    }

    return (
      <div>
        <Navbar
          on={this.on}
          off={this.off} 
          account={this.state.account}
          balance={this.state.balance}
          loading={this.state.loading} 
        />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
