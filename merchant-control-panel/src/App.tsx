import React, { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter, Route } from 'react-router-dom'
import Pannel from './pages/Pannel'

function App() {
  const [name, setName] = useState('')

  useEffect(() => {
    ; (async () => {
    })()
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} />
        <Route path="/" exact component={() => <Pannel name={name} />} />
      </BrowserRouter>
    </div>
  )
}

export default App
