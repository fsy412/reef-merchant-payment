import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import Layout from '../layouts/Layout'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
class PaymentHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      searchAddress: '',
    }
  }
  componentWillMount() {
    fetch('http://localhost:8000/payment_history')
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          list: res.data.res,
        })
      })
  }
  onSearchClick = () => {
    fetch('http://localhost:8000/search_payment_history', { method: 'post', body: JSON.stringify({ address: this.searchAddress.value }) })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          list: res.data.res,
        })
      })
  }
  render() {
    const list = this.state.list
    return (
      <Layout title="Payment History">
        <div>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search payment address" ref={(input) => (this.searchAddress = input)}></input>
            <button className="btn btn-outline-success" type="submit" onClick={this.onSearchClick}>
              Search
            </button>
          </form>
          <div className="table-responsive mt-4">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">Hash</th>
                  <th scope="col">Payment Address</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Payment Time</th>
                </tr>
              </thead>
              <tbody>
                {list.map((record) => {
                  return (
                    <tr key={record.id}>
                      <td>
                        <a href={'https://testnet.reefscan.com/transfer/' + record.tx} target={'https://testnet.reefscan.com/transfer/' + record.tx}>
                          {record.tx.substr(0, 6) + '...' + record.tx.substr(62)}
                        </a>
                      </td>
                      <td>{record.payment_address}</td>
                      <td>{record.balance} REEF</td>
                      <td>{moment(record.create_time * 1000).format('YYYY/MM/DD HH:mm:ss')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PaymentHistory
