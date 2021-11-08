import React from 'react'
import Layout from '../layouts/Layout'
import { WsProvider } from '@polkadot/rpc-provider'
import { Provider, Signer as EvmSigner } from '@reef-defi/evm-provider'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { Signer } from '@reef-defi/evm-provider'
import './payment.css'

class Payment extends React.Component {
  constructor() {
    super()
    this.state = {
      payAddress: '',
      account: '',
      isActivePayment: true,
      isActiveConfirm: false,
      isActiveDone: false,
      progress: 0,
      stepInfo: 'Fill payment info to go to next step',
      amountToPay: 0,
      tx: '',
    }
  }
  componentWillUnmount() { }

  handleValueChange(field, value, type = 'string') {
    if (type === 'number') {
      value = +value
    }

    this.setState({
      [field]: value,
    })
  }

  onNextClick = (e) => {
    e.preventDefault()
    fetch('http://localhost:8000/payment', { method: 'post' })
      .then((res) => res.json())
      .then((data) => this.setState({ payAddress: data.data }))
      .catch((e) => console.log('error:', e))

    this.setState({ isActivePayment: false })
    this.setState({ isActiveConfirm: true })
    this.setState({ progress: 50 })
    this.setState({ stepInfo: 'Payment Confirmation' })
    this.setState({ amountToPay: this.input.value })
  }

  onPayClick = () => {
    const injectedPromise = web3Enable('@reef-defi/ui-example')
    const URL = 'wss://rpc-testnet.reefscan.com/ws'
    const provider = new Provider({
      provider: new WsProvider(URL),
    })

    provider.api.on('connected', () => { })
    provider.api.on('disconnected', () => { })

    // Populate account dropdown with all accounts when API is ready
    provider.api.on('ready', async () => {
      try {
        await injectedPromise
          .then(() => web3Accounts())
          .then((accounts) => {
            // Setup Polkadot.js signer
            injectedPromise
              .then(async (extensions) => {
                new Signer(provider, accounts[0].address, extensions[0].signer)
                const transfer = provider.api.tx.balances.transfer(this.state.payAddress, BigInt(1e18 * this.state.amountToPay))
                let tx = await transfer.signAndSend(accounts[0].address)
                this.setState({ tx: tx.toString() })
                // update payment hash to backend
                fetch('http://localhost:9001/api/payment_tx', { method: 'post', body: JSON.stringify({ tx: tx.toString(), paymentAddress: this.state.payAddress }) })
                  .then((res) => res.json())
                  .catch((e) => console.log('error:', e))

                // start query the webhook notification result
                this.timer = setInterval(() => {
                  fetch('http://localhost:8000/query_notification', { method: 'post', body: {} })
                    .then((res) => res.json())
                    .then((res) => {
                      console.log(res)
                      if (res.data) {
                        clearInterval(this.timer)
                        this.setState({ progress: 100 })
                        this.setState({ isActiveConfirm: false })
                        this.setState({ isActiveDone: true })
                      }
                    })
                }, 1000)
              })
              .catch((error) => console.error(error))
          })
          .then((accounts) => { })
          .catch((error) => {
            console.error('web3Enable', error)
            return []
          })
      } catch (error) {
        console.error('Unable to load chain', error)
      }
    })
  }

  render() {
    const isActivePayment = this.state.isActivePayment
    const isActiveConfirm = this.state.isActiveConfirm
    const isActiveDone = this.state.isActiveDone
    let progress = this.state.progress
    let stepInfo = this.state.stepInfo
    let payAddress = this.state.payAddress
    let amountToPay = this.state.amountToPay

    return (
      <Layout title="Payment">
        <div className="container-payment  ">
          <h2 id="heading">Payment Progress</h2>
          <p>{stepInfo}</p>
          <div className="accordion" id="accordionExample">
            <div className="steps">
              <progress id="progress" value={progress} max={100}></progress>
              <div className="step-item">
                <button className="step-button text-center" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  1
                </button>
                <div className="step-title">Payment</div>
              </div>
              <div className="step-item">
                <button className="step-button text-center " type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded={progress >= 50} aria-controls="collapseTwo">
                  2
                </button>
                <div className="step-title">Pay</div>
              </div>
              <div className="step-item">
                <button className="step-button text-center collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded={progress >= 100} aria-controls="collapseThree">
                  3
                </button>
                <div className="step-title">Finish</div>
              </div>
            </div>

            <div className="card">
              <div className={isActivePayment ? null : 'collapse'} aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-header">Payment Info</div>
                <div className="card-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Amount to pay</span>
                    <input type="text" className="form-control" ref={(input) => (this.input = input)}></input>
                    <span className="input-group-text">Reef</span>
                  </div>
                  <p className="card-text">Payment has a transaction gas fee 1.5 REEF</p>
                  <div className="btn-wrapper">
                    <button className="btn btn-primary" type="submit" onClick={this.onNextClick.bind(this)}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div id="collapseTwo" className={isActiveConfirm ? null : 'collapse'} aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  <p>
                    <strong>Payment address: </strong>
                    {payAddress}
                  </p>
                  <p>
                    <strong>Amount: </strong> {amountToPay} REEF
                  </p>
                  <div className="btn-wrapper">
                    <button className="btn btn-primary" type="submit" onClick={this.onPayClick}>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div id="headingThree"></div>
              <div id="collapseThree" className={isActiveDone ? null : 'collapse'} aria-labelledby="headingThree" data-parent="#accordionExample">
                <div className="card-body"></div>
                <p>
                  <strong>Payment Success </strong>
                </p>
                <p>
                  <strong>Transaction Hash: {this.state.tx}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

Payment.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default Payment
