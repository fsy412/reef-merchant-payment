import React, { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter, Route } from 'react-router-dom'
import Pannel from './pages/Pannel/Pannel'
import Swap from './pages/CrossSwap/Index'

import PageHead from "./components/PageHead/PageHead"


function App() {
  const [name, setName] = useState('')

  useEffect(() => {
    ; (async () => {
    })()
  })

  return (
    <div className="App">
      <BrowserRouter>
        <PageHead></PageHead>
        <Route path="/" exact component={() => <Pannel name={name} />} />
        <Route path="/bridge" exact component={() => <Swap />} />
      </BrowserRouter>
    </div>
  )
}

export default App
