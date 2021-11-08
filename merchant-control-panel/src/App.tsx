import React, { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Nav from './components/Nav'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
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
        <Route path="/login" component={() => <Login setName={setName} />} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </BrowserRouter>
    </div>
  )
}

export default App
