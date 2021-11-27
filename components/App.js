import React, { Component } from 'react'
import Web3 from 'web3'
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import Navbar from './Navbar'
import Main from './Main'
import { getChain } from 'evm-chains'
import './App.css'

const BUSD_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const BUSD_ADDRESS = "0xe9e7cea3dedca5984780bafc599bd69add087d56"

const KYO_ABI = [{"inputs":[{"internalType":"address","name":"_reservesAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"carboncharityAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"carboncharityTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"excludeFromRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"holderTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"includeInRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isExcludedFromRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpStakingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reservesAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reservesTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_actualAmount","type":"uint256"},{"internalType":"bool","name":"_deductTransferFee","type":"bool"}],"name":"rewardsFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_carboncharityAddress","type":"address"}],"name":"setCarbonCharityAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpStakingAddress","type":"address"}],"name":"setLpStakingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_reservesAddress","type":"address"}],"name":"setReservesAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_holderTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_reservesTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_lpTaxAlloc","type":"uint256"},{"internalType":"uint256","name":"_carboncharityTaxAlloc","type":"uint256"}],"name":"setTaxAllocations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_taxPercentage","type":"uint256"}],"name":"setTaxPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"taxPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardAmount","type":"uint256"}],"name":"tokenWithRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCarbonCharityFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalHolderFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLpFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReservesFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalTaxAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const KYO_ADDRESS = "0xaEBC9EbDd1CD6808b632aA675eA571EEddD0C5b4"

const KYOSWAP_ABI = [{"inputs":[{"internalType":"address","name":"_busd","type":"address"},{"internalType":"address","name":"_kyo","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"busd","outputs":[{"internalType":"contractIERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"kyo","outputs":[{"internalType":"contractIERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountbusd","type":"uint256"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawbalance","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const KYOSWAP_ADDRESS = "0xb00bF0128e988c331916d62A61501F96E728f47a"

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

      this.setState({ account: account, network: network.network })

      let token = this.state.web3.eth.Contract(BUSD_ABI, BUSD_ADDRESS)
      this.setState({ token })
      this.state.token.transactionConfirmationBlocks = 1

      let kyoToken = this.state.web3.eth.Contract(KYO_ABI, KYO_ADDRESS)
      this.setState({ kyoToken })

      let kyoSwap = this.state.web3.eth.Contract(KYOSWAP_ABI, KYOSWAP_ADDRESS)
      this.setState({ kyoSwap })

      this.refreshBalance()

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

  buyTokens = (tokenAmount) => {
    window.alert('After you click the OK button, you will be taken to your wallet app where you will be prompted to approve 2 back to back transactions on your wallet. After you approve the first one, please wait until the second prompt appears and approve that too.')    
    this.setState({ loading: true })    
    tokenAmount = this.state.web3.utils.toWei(tokenAmount, 'ether')

    if(this.state.provider!==null){
      this.state.token.methods.approve(this.state.kyoSwap.address, tokenAmount).send({ from: this.state.account }).on('receipt', (receipt) => {
        this.state.kyoSwap.methods.swap(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      }).on('error', (error) => { 
        this.setState({ loading: false })
      })
    } else {
      window.alert("Please click the CONNECT button to link your wallet first.")
      this.setState({ loading: false })
    }
  }

  async refreshBalance(event){
    let balance

    if(this.state.account!==null){
      balance = await this.state.kyoToken.methods.balanceOf(this.state.account).call({ from: this.state.account })
      balance = balance.toString(10)
      balance = this.state.web3.utils.fromWei(balance, 'ether')
    } else {
      balance = 0
    }
    this.setState({ balance: balance })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: null,
      token: {},
      kyoToken: {},
      kyoSwap: {},
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
        buyTokens={this.buyTokens}
        balance={this.state.balance}
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
