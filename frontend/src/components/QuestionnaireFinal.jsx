import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

function QuestionnaireFinal() {
  return (
    <Container className='p-3 m-3 text-center'>
      <Card className='bg-light'>
        <Card.Body>
          <Card.Title className='p-3 m-3'>
            <p>Your answers have been submitted.</p>
            <p>Thank you for participating in our survey!</p>
          </Card.Title>
          <Link to='/' >
            <Button>Back to all questionnaires</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default QuestionnaireFinal