import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import HomePage from './pages/Home'
import Payment from './pages/Payment'
import PaymentHistory from './pages/PaymentHistory'

const rootElement = document.getElementById('example')

if (!rootElement) {
  throw new Error("Unable to find element with id 'example'")
}
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/payment" component={Payment} />
    <Route path="/user/list" component={PaymentHistory} />
  </Router>,

  rootElement
)
