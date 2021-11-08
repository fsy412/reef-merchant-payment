import React from 'react'
import { useState, useEffect } from 'react'
import FeaturedInfo from '../components/featuredInfo/FeaturedInfo'
import moment from 'moment'
import './pannel.css'

const Home = (props: { name: string }) => {
  const [merchantList, setMerchantList] = useState<any[]>([])
  const [latestPayments, setLatestPayments] = useState<any[]>([])
  const [merchantNum, setMerchantNum] = useState<number>(0)
  const [paymentNum, setPaymentNum] = useState<number>(0)
  const [reefNum, setReefNum] = useState<number>(0)

  useEffect(() => {
    loadMerchantList()
    loadLatestPayments()
    loadStats()
  }, [])

  const updateStat = (res: any) => {
    let data = res.data.res
    setMerchantNum(data[0])
    setPaymentNum(data[1])
    setReefNum(data[2])
  }
  const loadMerchantList = () => {
    fetch('http://localhost:9001/api/merchant_list')
      .then((res: any) => res.json())
      .then((res: any) => setMerchantList(res.data.res))
  }
  const loadLatestPayments = () => {
    fetch('http://localhost:9001/api/latest_payments')
      .then((res: any) => res.json())
      .then((res: any) => setLatestPayments(res.data.res))
  }
  const loadStats = () => {
    fetch('http://localhost:9001/api/stat')
      .then((res: any) => res.json())
      .then((res: any) => updateStat(res))
  }

  return (
    <div>
      <div className="container">
        <FeaturedInfo
          merchantNum={merchantNum}
          paymentNum={paymentNum}
          reefNum={reefNum}
        />
        <div className="dataTable">
          <span className="tabName">Merchant List</span>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Main Account</th>
                <th scope="col">WebHook URL</th>
                <th scope="col">Register Time</th>
              </tr>
            </thead>
            <tbody>
              {merchantList.map((record: any, key: any) => {
                return (
                  <tr key={key}>
                    <td>{record.id}</td>
                    <td>{record.account}</td>
                    <td>{record.webhook}</td>
                    <td>{moment(record.create_time * 1000).format('YYYY/MM/DD HH:mm:ss')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <span className="tabName">Latest Payment</span>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Hash</th>
                <th scope="col">Payment Address</th>
                <th scope="col">Amount</th>
                <th scope="col">Payment Time</th>
              </tr>
            </thead>
            <tbody>
              {latestPayments.map((record: any, key: any) => {
                return (
                  <tr key={key}>
                    <td>
                      <a href={'https://testnet.reefscan.com/transfer/' + record.tx}
                        target={
                          'https://testnet.reefscan.com/transfer/' + record.tx
                        }
                      >
                        {record.tx.substr(0, 6) + '...' + record.tx.substr(62)}{' '}
                      </a>
                    </td>
                    <td>{record.payment_address}</td>
                    <td>{record.balance} REEF</td>
                    <td>
                      {moment(record.create_time * 1000).format('YYYY/MM/DD HH:mm:ss')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
