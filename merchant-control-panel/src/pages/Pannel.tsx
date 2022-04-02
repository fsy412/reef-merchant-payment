import React from 'react'
import { useState, useEffect } from 'react'
// import Button from 'react-bootstrap/Button'
import { Button, Alert , Breadcrumb, BreadcrumbItem} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './pannel.css'

const Home = (props: { name: string }) => {
  return (
    <div>
      <header className='App-header'>
        <Breadcrumb>
        <Breadcrumb.Item>Test  </Breadcrumb.Item>
        <Breadcrumb.Item>Test2  </Breadcrumb.Item>
        <Breadcrumb.Item>Test3  </Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <Alert variant="success">this is a button </Alert>
      <Button>test button </Button>

    </div>
  )
}

export default Home
