import React, { SyntheticEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Modal, Button, Alert } from 'react-bootstrap'
const Register = () => {
  const [merchantName, setMerchantName] = useState('')
  const [account, setAccount] = useState('')
  const [webHookUrl, setWebHookUrl] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [apiKey, setApiKey] = useState('')

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await fetch('http://localhost:9001/api/merchant/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchantName,
        account,
        webHookUrl,
      }),
    })
      .then((res) => res.json())
      .then((res) => setApiKey(res.data.apiKey))
    setShow(true)
  }

  if (redirect) {
    return <Redirect to="/login" />
  }

  return (
    <>
      {/* <Alert show={true} variant="success">
        Merchant Registered
        <h5> API Key:skldfjlskdjflsljdk</h5>
      </Alert> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Merchant Registered</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          API key: <strong>{apiKey}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>

      <main className="form-signin">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Merchant Register</h1>
          <input
            className="form-control mb-2"
            placeholder="Merchant Name"
            required
            onChange={(e) => setMerchantName(e.target.value)}
          />
          <input
            className="form-control mb-2"
            placeholder="Main Account"
            required
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            className="form-control mb-2"
            placeholder="WebHook URL"
            required
            onChange={(e) => setWebHookUrl(e.target.value)}
          />
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  )
}

export default Register
