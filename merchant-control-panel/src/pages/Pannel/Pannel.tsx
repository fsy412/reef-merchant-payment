import React from 'react'
import { useState, useEffect } from 'react'
// import Button from 'react-bootstrap/Button'
import { Button, Alert, Breadcrumb, BreadcrumbItem, Card, Accordion } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './pannel.css'

const Home = (props: { name: string }) => {
  return (
    <div>
      <header className='App-header'>
        <Card>
          <Card.Img></Card.Img>
          <Card.Body>
            <Card.Title>
              Card Example
            </Card.Title>
            <Card.Text>
              This is an example of react bootstrap cards
            </Card.Text>
            <Button variant='primary'>Text Button </Button>
          </Card.Body>

        </Card>
        <Breadcrumb>
          <Breadcrumb.Item>Test  </Breadcrumb.Item>
          <Breadcrumb.Item>Test2  </Breadcrumb.Item>
          <Breadcrumb.Item>Test3  </Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <Alert variant="success">this is a button </Alert>
      <Button>test button </Button>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div>
  )
}

export default Home
